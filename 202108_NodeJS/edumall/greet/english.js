var greetings = require('./greetings.json');

var sayHello = function () {
    console.log(greetings.en);
}

module.exports = sayHello;