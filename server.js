
const http = require("http");
const fs = require("fs");
const path = require("path");

function sendfile(res, filePath, contentType) {
    const fullPath = path.join(__dirname, "public", filePath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("file non trovato");
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {

    switch (req.url) {

        case '/':
            sendfile(res, "index.html", "text/html");
            break;

        case '/about':
            sendfile(res, "about.html", "text/html");
            break;

        case '/image':
            sendfile(res, "image.html", "text/html");
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("pagina non trovata");
    }
});

server.listen(3000, () => {
    console.log("server in ascolto sulla porta 3000");
});
