var say = require("./hello.js");
say();

var greet = require('./greet');
greet.english();
greet.vietnamese();

var hello2 = require('./hello2');

var buffer = new Buffer("Xin chào", "utf8");
console.log(buffer);
console.log(buffer.toString());
console.log(buffer.toString("ascii"));
console.log(buffer.toJSON());

buffer.write("Tung");
console.log(buffer.toString());

var buffer = new ArrayBuffer(8); // 8x8 = 64-bit
var view = new Int32Array(buffer);
view[0] = 5;
view[1] = 10;
view[2] = 15;
console.log(view);

