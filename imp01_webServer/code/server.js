// In package.json: "start": "node ./bin/www"
// server.js
// load the things we need
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const UserRoute = require('./UserRoute');
const LedRoute = require('./LedRoute');

const PORT = process.env.PORT || 3000;

const config = require('./db');
// MongoDB
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connecteddd') },
    err => { console.log('Can not connect to the database'+ err)}
);

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// UserRoute
app.use('/user', UserRoute);
// LedRoute
app.use('/led', LedRoute);

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    //res.render('pages/index');
    var drinks = [
        { name: 'HTTP Server', drunkness: 3 },
        { name: 'MQTT Server', drunkness: 5 },
        { name: 'CoAP Server', drunkness: 10 }
    ];
    var tagline = "Android things | Linux | Client | etc.";

    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline
    });
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// use 'public' folder
// we can access resource in public/ folder, e.g. /images/
// http://10.92.200.120:3000/images/icon.png
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
});
