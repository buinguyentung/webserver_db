// CMD 1: while true; do date && curl -m 10 http://localhost:8888/ping; sleep 1; done
// CMD 2: date && curl http://localhost:8888/
var express = require('express');
var app = express();
var port = 3000;

var SERVER_ENABLE = true;

function processBlocking() {
    SERVER_ENABLE = false;
    setTimeout(() => {
        console.log("Process Done!");
        SERVER_ENABLE = true;
    }, 10000);
}

app.use("/", (req, res, next) => {
    console.log("Access: " + req.url);
    if (SERVER_ENABLE) {
        next();
    } else {
        res.sendStatus(404);
    }
});

app.get("/", (req, res) => {
    res.send("Hi Tung");
});

app.get("/block", (req, res) => {
    res.send("Hi, I am a blocker");
    processBlocking();
});

app.get('/ping', function healthcheck(req, res) {
    res.send('all good!\n')
});

const crypto = require('crypto');
function genRandomString() {
    return crypto.randomBytes(100).toString('hex');
}

app.get('/hash', function computeSync(req, res) {
    const hash = crypto.createHash('sha256');
    for (let i = 0; i < 10e6; i++) {
        hash.update(genRandomString())
    }
    res.send(hash.digest('hex') + '\n');
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});
