const express = require('express');
const fs = require('fs');
const util = require('util');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

const apiKey = '684d8166ab9b2d19c7de59ad2c9b7aba-3fb021d1-37ad864f';
const domain = 'sandbox1fa2763dfc61402a9985084e4b0a15e7.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey, domain });
const MailComposer = require('nodemailer/lib/mail-composer');

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

const wss = new WebSocket.Server({ server });
const usersOnline = {};
const userId = {};

wss.on('connection', ws => {
    console.log('WS');
    const id = Math.random();
    ws.send(JSON.stringify({id}))
    usersOnline[id] = ws;

    
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
    } else if (user) {
        res.setHeader('Content-Type', 'text/json');
        res.json({ error: 'Unconfirmed email' });
    } else {
        res.setHeader('Content-Type', 'text/json');
        res.json({ error: 'Uncorrect email or password' });
    }

    console.log(userData.id);

    userId[user.username] = userData.id;

    usersOnline[userData.id].on('message', async message => {
        const { username1, username2, text } = JSON.parse(message);
        console.log(Object.keys(usersOnline));

        if (username2 in userId) {
            usersOnline[userId[username2]].send(JSON.stringify({ username1, text }));
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
        }, [ ...messages, { username1, text } ]);
    });

    usersOnline[userData.id].on('close', () => {
        delete usersOnline[user.username];
    });
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
    user.active = false;
    user.id = Math.random();
    await user.save();

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

    res.setHeader('Content-Type', 'text/json');
    res.json({ error: 'Confirm email' });
});

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

const dbRoute = 'mongodb://YuriNem:dbyn97@ds123753.mlab.com:23753/yuridb';
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true },
);
const db = mongoose.connection;
db.once('open', () => console.log("Connected to the database"));
