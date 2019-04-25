const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextSchema = new Schema({
    telephone: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    state: {     //This is whether the text is 1) initial, 2) Location, 3) review, 4) comment
        type: String,
        required: true,
        trim: true
    },
    valid: {     //This is whether the text is 1) initial, 2) Location, 3) review, 4) comment
        type: Boolean,
        required: true,
        default: false
    }
});


const Text = mongoose.model('Text', TextSchema);

module.exports = Text;