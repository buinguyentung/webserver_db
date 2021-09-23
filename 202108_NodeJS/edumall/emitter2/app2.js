var EventEmitter = require('events');
var util = require('util');

class Dialog extends EventEmitter {
    constructor() {
        super();
        this.message = "Hello";
    }
}

// util.inherits(Dialog, EventEmitter);

Dialog.prototype.sayHello = function(data) {
    console.log(this.message + ": " + data);
    this.emit("hi", data);
}

var dialog = new Dialog();
dialog.on("hi", function(data) {
    console.log("Someone said hi! " + data);
})
dialog.sayHello("I am Tung");

