const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  streetAddress: {
    type: String,
    required: false,
    trim: true
  },
  city: {
    type: String,
    required: false,
    trim: true
  },
  state: {
    type: String,
    required: false,
    trim: true
  },
  zipCode: {
    type: String,
    required: false,
    trim: true
  },
  phonenumber: {
    type: String,
    required: true,
    trim: true
  }
});


const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;