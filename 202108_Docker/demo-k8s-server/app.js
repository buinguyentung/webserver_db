const http = require('http');
var os = require('os');

//create a server object:
http.createServer(function (req, res) {
  var networkInterfaces = os.networkInterfaces();
  // console.log(networkInterfaces);
  res.write(JSON.stringify(networkInterfaces) + "Hello World!");
  res.end();
}).listen(8080);


