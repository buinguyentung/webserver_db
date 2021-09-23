let express = require('express');
let app = express();

app.listen(8888, "localhost", (req, res) => {
    console.log('Server is running on localhost:8888');
});

app.get('/ping', function healthcheck(req, res) {
    res.send('all good!\n');
});

const crypto = require('crypto');
function genRandomString() {
    return crypto.randomBytes(100).toString('hex');
}

app.get('/hash', async function computeSync(req, res) {
    const hash = crypto.createHash('sha256');
    function setImmediatePromise() {
        return new Promise((resolve) => {
            setImmediate(() => resolve());
        });
    }
    for (let i = 0; i < 10e6; i++) {
        hash.update(genRandomString());
        await setImmediatePromise();
    }
    res.send(hash.digest('hex') + '\n');
});