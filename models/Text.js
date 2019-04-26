const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextSchema = new Schema({
    //The number of the consumer texting us
    customerNumber: {
        type: String,
        required: true,
        trim: true
    },
    //The number the customer texted. Essentially the ID for the location they're reviewing
    locationPhonenumber: {
        type: String,
        required: true,
        trim: true
    },
    //A log of all messages they sent to us, regardless of if the message was valid
    messages: [{
        textBody: {
            type: String,
            required: true,
            trim: true
        },
        timeStamp: {
            type: Date,
            required: true,
            default: Date.now
        }
    }],
    //A bool tracking whether or not this interaction is complete.
    reviewComplete: {
        type: Boolean,
        required: true,
        default: false
    },
    //A bool tracking whether or not this review is actually valid data.
    //Check this before adding this review to any charts to display to client.
    //The reviewComplete bool could be true because that interaction is finished,
    //but if we didn't actually manage to get a complete review from the person
    //it shouldn't be added to review data displayed to the client.
    reviewValid: {
        type: Boolean,
        required: true,
        default: false
    },
    //The actual rating given, 1-10
    rating: {
        type: Number,
        required: false,
        validation : (number) => {
            if (number > 0 && number <= 10) {
                return true;
            } else return false;
        }
    },
    //The ID of the client this review is for.
    client_id:
        {
          // Store ObjectIds in the array
          type: Schema.Types.ObjectId
        },
    //The time the message was initially added to the database.
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
    //,
    // state: {     //This is whether the text is 1) initial, 2) Location, 3) review, 4) comment
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    // valid: {     //This is whether the text is 1) initial, 2) Location, 3) review, 4) comment
    //     type: Boolean,
    //     required: true,
    //     default: false
    // }
});


const Text = mongoose.model('Text', TextSchema);

module.exports = Text;