var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
    console.log('on publisher client.on');
    setInterval(function(){client.publish('mytopic', 'Hello mqtt')},1000)
});