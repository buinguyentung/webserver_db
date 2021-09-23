var fs = require("fs");

const filename = "./logfile.txt";

if(!fs.existsSync(filename)){
  fs.writeFileSync(filename, "");
}

var wStream = fs.createWriteStream(filename);

function logger(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  wStream.write(message);
};

logger("abc");