var express = require('express');
var myParser = require("body-parser");
var app = express();
var JpegRouter = express.Router();

var jsonHeader = null;


app.use(myParser.urlencoded({extended : true}));

// ==============================================================
// === REST APIs
// ==============================================================

var fs = require('fs');
var request = require('request');

// Method 1: Web-server requests JPEG to Colorbit app by GET method
// var download = function(uri, filename, callback){
//     request.head(uri, function(err, res, body){
//         request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//     });
// };

// Method: GET
// URL: http://192.168.0.90:3000/jpeg
JpegRouter.route('/').get(function (req, res) {
    console.log("GET JPEG Implementation");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(jsonHeader, null, 2));

    // download(IMG_URL, 'pic1.jpg', function(){
    //     console.log('done');
    // });
});

// {
//     "host": "192.168.0.102:3000",
//     "accept": "*/*",
//     "content-type": "image/jpeg",
//     "x-camera-id": "2913861633",
//     "x-shooting-time": "1554366533",
//     "x-number-of-colorbit": "2",
//     "x-colorbit-ids": "0,1",
//     "x-colorbit-info": "[{\"id\":0,\"vertex\":[{\"x\":532,\"y\":174},{\"x\":530,\"y\":138},{\"x\":174,\"y\":158},{\"x\":176,\"y\":194}]},{\"id\":1,\"vertex\":[{\"x\":540,\"y\":314},{\"x\":538,\"y\":268},{\"x\":170,\"y\":270},{\"x\":172,\"y\":316}]}]",
//     "content-length": "21989",
//     "expect": "100-continue"
// }


// Method: POST
// URL: http://192.168.0.90:3000/jpeg
JpegRouter.route('/').post(function (req, res) {
    console.log("Received jpeg data");
    var req_head = req.headers;
    console.log("req head: " + JSON.stringify(req_head));
    jsonHeader = req_head;

    // Extract x-shooting-time from JSON
    var imageName = "";
    imageName = req_head["x-shooting-time"];
    console.log("x-shooting-time: " + imageName);

    req.setEncoding('binary');
    body = "";
    req.on('data', (data) => { body += data; });
    req.on('end', (err) => {
        //console.log(body);
        fs.writeFile('/home/vsa/vsa_backup/webcam' + imageName + '.jpg', body, 'binary', (err) => {
            //console.log("Success");
        });
        if (!err) { 
            console.log("Success");
            res.status(200).send();
          } else {
            res.status(400).send();
          }
    });

});

module.exports = JpegRouter;
