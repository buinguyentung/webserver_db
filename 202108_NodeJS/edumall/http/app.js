var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end("Hi bro");
// }).listen(1337, "127.0.0.1");

var fs = require('fs');

// Đọc file đồng bộ
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     var html = fs.readFileSync(__dirname + "/index2.html", "utf-8");
//     var user = "Tung pro";
//     html = html.replace("{name}", user);
//     res.end(html);
// }).listen(1337, "127.0.0.1");

// Đọc file không đồng bộ
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     fs.readFile(__dirname + "/index2.html", "utf-8", function(err, data) {
//         var user = "Tung BN";
//         data = data.replace("{name}", user);
//         res.end(data);
//     });
// }).listen(1337, "127.0.0.1");


// Stream - pipe
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     fs.createReadStream(__dirname + "/index.html").pipe(res);
// }).listen(1337, "127.0.0.1");

// Trả về dữ liệu JSON
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var obj = {
        firstName: "Tung",
        lastName: "B"
    }
    res.end(JSON.stringify(obj));
}).listen(1337, "127.0.0.1");
    

// Routing
// http.createServer(function (req, res) {
//     if (req.url === "/" || req.url === "/index.html") {
//         fs.createReadStream(__dirname + "/index.html").pipe(res);
//     } else if (req.url === "/api") {
//         res.writeHead(200, {'Content-Type': 'text/json'});
//         var obj = {
//             firstName: "Tung",
//             lastName: "B"
//         }
//         res.end(JSON.stringify(obj));
//     } else {
//         res.writeHead(404);
//         res.end("Not Found");
//     }
// }).listen(1337, "127.0.0.1", function () {
//     console.log("Server listening on http://localhost:1337");
// });


