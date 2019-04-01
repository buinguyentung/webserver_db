var express = require('express');
var myParser = require("body-parser");
var app = express();
var BrDataRouter = express.Router();

var jsObject = null;

app.use(myParser.urlencoded({extended : true}));

// ==============================================================
// === REST APIs
// ==============================================================

// BarcodeData main page
// URL: http://localhost:3000/brdata
// Method: GET
BrDataRouter.route('/').get(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(jsObject, null, 2));
    res.end("Hello from Web server");
});

// Handle Barcode data from Color bit app
// URL: http://localhost:3000/brdata
// Method: POST
BrDataRouter.route('/').post(function (req, res) {
    jsObject = req.body;

    console.log(jsObject);

    // Remember to return to Colorbit to prevent from 3s waiting
    res.status(200).send();
});

module.exports = BrDataRouter;
