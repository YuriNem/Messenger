const express = require('express');
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

app.listen(process.env.PORT || 3000, () => console.log('Server is working'));
