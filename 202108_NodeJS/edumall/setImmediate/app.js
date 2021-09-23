// file: wrong-timeout-immediate.js
setTimeout(function(){
    console.log("Timeout");
});
setImmediate(function(){
    console.log("Immediate");
});