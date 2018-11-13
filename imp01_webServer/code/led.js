// led.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LedDataSchema = new Schema({
  led_id: {
    type: String, require: true
  },
  led_state: {
      type: String
  }
},{
    collection: 'leds'
});

module.exports = mongoose.model('Led', LedDataSchema);