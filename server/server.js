const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

const app = express();
const readFilePromise = util.promisify(fs.readFile);

app.get('/', async (req, res) => {
    const html = await readFilePromise('./public/index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});

app.get('/dist/main.js', async (req, res) => {
    const js = await readFilePromise('./dist/main.js');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(js);
});

const dbUsers = [{
    email: 'PsychoactivePie@gmail.com',
    password: 'qwerty123',
    session: '',
    dialogues: [
        {
            user: '',
            messages: [
                {
                    sender: '',
                    message: '',
                },
            ],
        },
    ],
}];

const getUserFromDBUsers = user => 
    dbUsers.find(({ email, password }) => 
        user.email === email && user.password === password);

const generateSession = () => Math.floor(Math.random() * 1000) + 1;

app.use(bodyParser.json());

app.post('/signin', async (req, res) => {
    const user = req.body;
    const userFromDBUsers = getUserFromDBUsers(user);
    if (userFromDBUsers) {
        const session = generateSession();
        userFromDBUsers.session = session;
        res.setHeader('Set-Cookie', `session=${session}`);
        res.end('sucsess');
    } else {
        res.writeHead(200, { 'Content-Type': 'text' });
        res.end('fail');
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Server is working'));
