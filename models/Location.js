const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  locationId: {
    type: Number,
    required: true
  }
});


const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;