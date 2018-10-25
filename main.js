var greetings = require("./greetings.js");
console.log('English: ' + greetings.sayHelloInEnglish());
console.log('Spanish: ' + greetings.sayHelloInSpanish());

var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello Node.js');
}).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000');