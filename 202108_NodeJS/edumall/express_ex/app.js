var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3001;

// body-parser
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

// Static files
app.use("/assets", express.static(path.join(__dirname, "public")));
// Custom middleware
app.use("/", function (req, res, next) {
    console.log("Request URL: " + req.url);
    req.requestTime = new Date();
    next();
});
// Template engine
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

app.get('/', (req, res) => {
    //res.send('<h1>Hi, I am Tung</h1>');
    res.render("index");
});

// http://localhost:3001/user/123
app.get('/user/:id', (req, res) => {
    res.send(`<h1>User: ${req.params.id} </h1>`);
});

app.get('/format', (req, res) => {
    res.send(`
        <link href="/assets/style.css" rel="stylesheet" type="text/css">
        <h1>Hi, I am Tung</h1>
        <p>Request time: ${req.requestTime}</p>
    `);
});

// Template engine EJS
// http://localhost:3001/user2/123
app.get('/user2/:id', (req, res) => {
    res.render("user", {ID: req.params.id});
});

// http://localhost:3001/user/tungbui?qstr=1234
app.get('/user3/:id', (req, res) => {
    res.render("userquery", {ID: req.params.id, qstr: req.query.qstr});
});

// body-parser: Login
app.get('/login', (req, res) => {
    res.render("indexlogin.ejs");
});

app.post("/login", urlencodedParser, (req, res) => {
    res.send("Welcome " + req.body.username);
    console.log(req.body.username);
    console.log(req.body.password);
});

// body-parser: Login JSON
app.post("/loginjson", jsonParser, (req, res) => {
    res.send("Welcome " + req.body.username);
    console.log(req.body.username);
    console.log(req.body.password);
});

