const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');
const http = require('http');
const WebSocket = require('ws');

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

const dbUsers = [{
    email: 'PsychoactivePie@gmail.com',
    password: 'qwerty123',
    session: '',
    name: 'Yuri Nemushkin',
    dialogues: ['Some User'],
}, {
    email: 'SomeUser@gmail.com',
    password: 'password123',
    session: '',
    name: 'Some User',
    dialogues: ['Yuri Nemushkin'],
}];

const dbDialogue = [{
    name1: 'Yuri Nemushkin',
    name2: 'Some User',
    messages: [
        {
            sender: 'Yuri Nemushkin',
            message: 'Hi',
        },
        {
            sender: 'Some User',
            message: 'Bye',
        },
    ],
}];

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const usersOnline = {};

const generateSessionID = () => Math.floor(Math.random() * 1000) + 1;

const getUserFromDBUsersByName = name => 
    dbUsers.find(user => user.name === name);

const getDialogueFromDBDialogue = ({ name1, name2 }) =>
    dbDialogue.find(dialogue =>
        (dialogue.name1 === name1 && dialogue.name2 === name2)
        ||
        (dialogue.name2 === name1 && dialogue.name1 === name2)
    );

wss.on('connection', ws => {
    const sessionID = generateSessionID();
    usersOnline[sessionID] = ws;
    ws.send({ sessionID });

    ws.on('message', ({ sender, receiver, message }) => {
       const { sessionID } = getUserFromDBUsersByName(receiver);
       if (usersOnline[sessionID]) {
           usersOnline[sessionID].send({ sender, message });
       }

       const dialogueFromDBDialogue = getDialogueFromDBDialogue({ 
           name1: sender,
           name2: receiver,
        });
        dialogueFromDBDialogue.push({ sender, message });
    });

    ws.on('close', () => {
        delete usersOnline[sessionID];
    });
});

app.use(bodyParser.json());

const getUserFromDBUsers = ({ email, password }) => 
    dbUsers.find(user => user.email === email && user.password === password);

app.post('/signin', async (req, res) => {
    const userData = req.body;
    const userFromDBUsers = getUserFromDBUsers(userData);
    if (userFromDBUsers) {
        userFromDBUsers.session = userData.session;
        res.setHeader('Set-Cookie', `session=${session}`);

        const { name, dialogues } = userFromDBUsers;
        res.setHeader('Content-Type', 'text/json');
        res.end(JSON.stringify({ name, dialogues }));
    } else {
        res.end();
    }
});

app.post('/dialogue', async (req, res) => {
    const dialogueData = req.body;
    const dialogueFromDBDialogue = getDialogueFromDBDialogue(dialogueData);
    const { messages } = dialogueFromDBDialogue;
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify({ messages }));
});

server.listen(process.env.PORT || 3000, () => console.log('Server is working'));
