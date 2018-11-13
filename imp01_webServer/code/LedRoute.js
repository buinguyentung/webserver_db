// LedRouter.js
const express = require('express');
const app = express();
const LedRouter = express.Router();
const Led = require('./led');

// MQTT
const mqtt = require('mqtt');
// options_user={
//     //clientId:"mqttjs01",
//     username:"quyencv",
//     password:"1",
//     clean:true};
// const client = mqtt.connect('mqtt://10.92.203.166:1883', options_user);
const client = mqtt.connect('mqtt://localhost');

var led_on_msg_def  = " ON";
var led_off_msg_def = " OFF";
var led_on_msg      = "";
var led_off_msg     = "";
var led_topic       = "";
var led_msg_options = {
    retain:true,
    qos:1
};
var led_topic_def = "led"

// ==============================================================
// === MQTT
// ==============================================================
// Client subscribes topics
client.on('connect', function () {
    console.log('Client subcribed ', led_topic_def);
    client.subscribe(led_topic_def);

    // Query all led_id in DB to subcribe corresponding topics
    Led.find(function (err, itms){
        for (var i = 0; i < itms.length; i++) {
            led_topic = itms[i].led_id.toLowerCase()
            console.log('Client subcribed ', led_topic);
            client.subscribe(led_topic);
        }
    });
});

// MQTT publishing function
function publish(topic, msg, options){
    console.log("publish to topic=", topic, "; msg=", msg);
    if (client.connected == true){
        client.publish(topic, msg, options);
    }
}

function update_db_and_refresh(id, message) {
    //console.log("id=" + id);
    Led.findById(id, function(err, led) {
        //console.log(led.led_id + " " + led.led_state + " " + message);
        led.led_state = message;
        
        led.save().then(led => {
            //res.redirect('/led');
        })
        .catch(err => {
            //res.status(400).send("unable to update the database");
        });
    });

}

client.on('message', function (topic, message) {
    var rec_topic = topic.toString().toUpperCase();
    var rec_mess = message.toString();
    var rec_id = null;
    console.log("MQTT receive: topic=" + rec_topic + "; mess=" + rec_mess);
    
    // Update DB of TEMP or HUMID
    if ((rec_topic.indexOf("TEMP") + 1) || (rec_topic.indexOf("HUMID") + 1)) {
        Led.find(function (err, itms){

            for (var i = 0; i < itms.length; i++) 
            if (itms[i].led_id.toString() == rec_topic) {
                rec_id = itms[i].id;
                //console.log("id=" + rec_id + "; value=" + itms[i].led_state);
                update_db_and_refresh(rec_id, rec_mess);
                break;
            }
        });
    }

    //client.end();
});


// ==============================================================
// === /led REST API
// ==============================================================

// LED main page
// URL: http://10.92.200.120:3000/led
// Method: GET
LedRouter.route('/').get(function (req, res) {
    Led.find(function (err, itms){
      if(err){
        console.log(err);
      }
      else {
        res.render('pages/ledlist', {itms: itms});
      }
    });
});

// Add new user by Postman
// URL: http://10.92.200.120:3000/led/create
// Json format:
// {
//    "led_id": "LED1"
//    "led_state": "OFF"
// }
LedRouter.route('/create').post(function (req, res) {
    const led = new Led(req.body);
    console.log(led);
    led.save()
    .then(led => {
        res.status(200).json('LED added successfully');
    })
    .catch(led => {
        res.status(400).send("unable to save to database");
    });
});

// ON/OFF Led event
LedRouter.route('/ledswitch/:id').get(function (req, res) {
    //var id = req.params.id;
    Led.findById(req.params.id, function(err, led) {
        if (!led)
          return next(new Error('Could not load Document'));
        else {
          //led.led_id = req.body.led_id;
          //led.led_state = req.body.led_state;

          // e.g. led.led_id = "LED1"
          // => led_topic="led1"; led_on_msg = "LED1 ON"; led_off_msg = "LED1 OFF"
          led_topic = led.led_id.toLowerCase();
          if (led.led_state == 'ON') {
              led.led_state = 'OFF';
              led_off_msg = led.led_id + led_off_msg_def;
              // test
              //led_topic = "humid2";
              //led_off_msg = "45";
              publish(led_topic, led_off_msg, led_msg_options);
          } else {
              led.led_state = 'ON';
              led_on_msg = led.led_id + led_on_msg_def;
              // test
              //led_topic = "humid2";
              //led_on_msg = "55";
              publish(led_topic, led_on_msg, led_msg_options);
          }

          led.save().then(led => {
              res.redirect('/led');
          })
          .catch(err => {
                res.status(400).send("unable to update the database");
          });
        }
      });
});

module.exports = LedRouter;