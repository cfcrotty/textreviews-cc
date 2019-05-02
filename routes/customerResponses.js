const db = require("../models");

//customer object to hold the responses and ID of the customer they belong to
function Customer(id, surResValid, surResInvalid, comResValid, comResInvalid) {
    this.id = id;
    this.surResValid = surResValid || "Thank You for the feedback! If you would like to add additional comments, just respond to this number!";
    this.surResInvalid = surResInvalid || "Please respond with a rating of 1-10!";
    this.comResValid = comResValid || "Thank You for the feedback! Your comments are appreciated.";
    this.comResInvalid = comResInvalid || "Please respond with any additional comments you have. That last message didn't look like a comment...";
}

function updateResponses() {

    let customerResponses = [];

    return db.User
        .find({})
        .then(dbUser => {
            dbUser.forEach(user => {
                customerResponses.push(new Customer(
                    user._id,
                    user.twilioResponses.surResValid,
                    user.twilioResponses.surResInvalid,
                    user.twilioResponses.comResValid,
                    user.twilioResponses.comResInvalid))
            })
            return customerResponses;
        })
}

module.exports = updateResponses;