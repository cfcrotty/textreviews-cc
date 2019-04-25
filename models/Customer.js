const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  texts: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      ref: "Text"
    }
  ]
});


const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;