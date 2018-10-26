const mqtt = require('mqtt');
//const client = mqtt.connect('mqtt://localhost');

options_user={
    //clientId:"mqttjs01",
    username:"quyencv",
    password:"1",
    clean:true};
const client = mqtt.connect('mqtt://10.92.203.166:1883', options_user);

// Client
client.on('connect', function () {
    console.log('Client subcribed mytopic');
    client.subscribe('mytopic');
});

client.on('message', function (topic, message) {
    console.log(message.toString());
    //client.end();
});

var message = "test message";
var topic = "mytopic";
var options = {
    retain:true,
    qos:1
};

//publish every 5 secs
var timer_id = setInterval(function() {
    publish(topic,message,options);},3000);

//publish function
function publish(topic, msg, options){
    console.log("publishing", msg);
    if (client.connected == true){
        client.publish(topic, msg, options);
    }
}
