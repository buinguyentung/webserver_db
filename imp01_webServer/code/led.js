// led.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Led = new Schema({
  led_id: {
    type: String
  },
  led_state: {
      type: String
  }
},{
    collection: 'leds'
});

module.exports = mongoose.model('Led', Led);