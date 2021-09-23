var Emitter = require('./emitter');
var eventConfig = require('./config').events;

var emitter = new Emitter;

emitter.on(eventConfig.BAD_SCORE, function () {
    console.log("Bad result!");
});

emitter.on(eventConfig.BAD_SCORE, function () {
    console.log("Bad result! Need to check!");
});

var scores = [10, 4];
for (var s of scores) {
    if (s < 5) {
        console.log("No way!");
        emitter.emit(eventConfig.BAD_SCORE);
    }
}