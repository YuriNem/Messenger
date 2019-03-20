const http = require('http');
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

http.createServer( async (req, res) => {
    if (req.url === '/') {
        const html = await readFilePromise('./public/index.html');
        res.end(html);
    } else if (req.url.match(/.js$/)) {
        const js = await readFilePromise('./dist/main.js');
        res.end(js);
    }
}).listen(process.env.PORT || 3000, () => console.log('Server is working'));

