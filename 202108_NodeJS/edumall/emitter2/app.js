var EventEmitter = require('events');
var util = require('util');

class Dialog extends EventEmitter {
    constructor() {
        super();
        this.message = "Hello";
    }
}

//util.inherits(Dialog, EventEmitter);

Dialog.prototype.sayHello = function() {
    console.log(this.message);
    this.emit("hi");
}

var dialog = new Dialog();
dialog.on("hi", function() {
    console.log("Someone said hi");
})
dialog.sayHello("I am Tung");

