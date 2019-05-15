const express = require('express');
const fs = require('fs');
const util = require('util');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

/*
const apiKey = '';
const domain = '';
const mailgun = require('mailgun-js')({ apiKey, domain });
const MailComposer = require('nodemailer/lib/mail-composer');
*/

const mongoose = require('mongoose');
const User = require('./user.js');
const Dialogue = require('./dialogue.js');

const app = express();
const readFilePromise = util.promisify(fs.readFile);

app.get('/', async (req, res) => {
    const html = await readFilePromise('./public/index.html');
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
});

app.get('/dist/main.js', async (req, res) => {
    const js = await readFilePromise('./dist/main.js');
    res.setHeader('Content-Type', 'text/javascript');
    res.end(js);
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => console.log('Server is working'));

const wss = new WebSocket.Server({ server });
const usersOnline = {};
const usersNamesIds = {};

wss.on('connection', ws => {
    const id = Math.random();
    ws.send(JSON.stringify({ id }));
    usersOnline[id] = ws;
});

app.use(bodyParser.json());

app.post('/username', async (req, res) => {
    const userData = req.body;
    const [user] = await User.find(userData);

    if (user) {
        res.setHeader('Content-Type', 'text');
        res.end('This username is not available');
    } else {
        res.setHeader('Content-Type', 'text');
        res.end('');
    }
});

app.post('/signin', async (req, res) => {
    const userData = req.body;
    const [user] = await User.find({
        email: userData.email,
        password: userData.password,
    });

    if (user && user.active) {
        res.setHeader('Content-Type', 'text/json');
        res.json({ username: user.username, dialogues: user.dialogues });

        usersNamesIds[user.username] = userData.id;

        usersOnline[userData.id].on('message', async message => {
            const { username1, username2, text } = JSON.parse(message);

            if (username2 in usersNamesIds) {
                usersOnline[usersNamesIds[username2]].send(JSON.stringify({ username1, text }));
            }

            const [dialogue] = [
                ...await Dialogue.find({ username1, username2 }), 
                ...await Dialogue.find({
                    username1: username2,
                    username2: username1,
                }),
            ];

            const { messages } = dialogue;
        
            await Dialogue.updateOne({
                username1: dialogue.username1,
                username2: dialogue.username2,
            }, { messages: [ ...messages, { username: username1, text }] });
        });

        usersOnline[userData.id].on('close', () => {
            delete usersOnline[userData.id];
            delete usersNamesIds[user.username];
        });
    } else if (user) {
        res.setHeader('Content-Type', 'text/json');
        res.json({ error: 'Unconfirmed email' });
    } else {
        res.setHeader('Content-Type', 'text/json');
        res.json({ error: 'Uncorrect email or password' });
    }
});

app.post('/signup', async (req, res) => {
    const userData = req.body;
    const [userWithEmail] = await User.find({
        email: userData.email,
    });

    if (userWithEmail) {
        res.setHeader('Content-Type', 'text/json');
        res.json({ error: 'Email already taken' });
        return;
    }

    const user = new User();
    user.email = userData.email;
    user.password = userData.password;
    user.username = userData.username;
    user.dialogues = [];
    user.active = true;
    user.id = Math.random();
    await user.save();

    /*
    const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: user.email,
        subject: 'Confirm email',
        text: 'Confirm email',
        html: `<a href="http://${req.headers.host}/confirm/${user.id}">Click to confirm email</a>`,
    };

    const mail = new MailComposer(data);
 
    mail.compile().build((err, message) => {
 
        const dataToSend = {
            to: user.email,
            message: message.toString('ascii'),
        };

        mailgun.messages().sendMime(dataToSend, (sendError, body) => {
            if (sendError) {
                console.log(sendError);
                return;
            }
        });
    });
    */

    res.setHeader('Content-Type', 'text/json');
    res.json({ error: 'Confirm email' });
});

/*
app.get('/confirm/:id', async (req, res) => {
    const [user] = await User.find({
        id: req.params.id,
    });

    if (user) {
        await User.updateOne({
            id: req.params.id,
        }, { active: true });

        res.setHeader('Content-Type', 'text/json');
        res.end('Confirmed');
    } else {
        res.setHeader('Content-Type', 'text');
        res.end('Error');
    }
});
*/

app.post('/messages', async (req, res) => {
    const dialogueData = req.body;
    const [dialogue] = [
        ...await Dialogue.find(dialogueData), 
        ...await Dialogue.find({
            username1: dialogueData.username2,
            username2: dialogueData.username1,
        }),
    ];

    const { messages } = dialogue;
    res.setHeader('Content-Type', 'text/json');
    res.json(messages);
});

app.get('/usernames', async (req, res) => {
    const users = await User.find({});

    res.setHeader('Content-Type', 'text/json');
    res.json(users.map(({ username }) => username));
});

app.post('/dialogue', async (req, res) => {
    const dialogueData = req.body;

    const [user1] = await User.find({
        username: dialogueData.username1,
    });
    await User.updateOne({
        username: dialogueData.username1,
    }, { dialogues: [...user1.dialogues, dialogueData.username2] });

    const [user2] = await User.find({
        username: dialogueData.username2,
    });
    await User.updateOne({
        username: dialogueData.username2,
    }, { dialogues: [...user2.dialogues, dialogueData.username1] });

    const dialogue = new Dialogue();
    dialogue.username1 = dialogueData.username1;
    dialogue.username2 = dialogueData.username2;
    dialogue.messages = [];
    await dialogue.save();

    res.setHeader('Content-Type', 'text');
    res.end('');
});

const dbRoute = '';
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true },
);
const db = mongoose.connection;
db.once('open', () => console.log("Connected to the database"));
