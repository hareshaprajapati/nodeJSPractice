const fs = require('fs');

const requestListenerCallback = (req, res) => {
    // console.log(req.url, '\n' , req.method, '\n' , req.headers);
    // process.exit(); // quit event loop
    if (req.url === '/') { 
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Titile</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    } else if (req.url === '/message' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, (error) => {
                // res.writeHead(302, null, { 'Location': '/' }); // below two lines are alternative
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Titile</title></head>');
    res.write('<body><h1>Hi Cool </h1></body>');
    res.write('</html>');
    res.end(); // no writing after end()
};

// module.exports = requestListenerCallback;
/* module.exports = {
    requestListenerCallback: requestListenerCallback
}; */
// module.exports.requestListenerCallback = requestListenerCallback;
exports.requestListenerCallback = requestListenerCallback;