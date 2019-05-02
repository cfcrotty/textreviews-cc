//Twilio setup
const accountSid = process.env.twilioAccountSID;
const authToken = process.env.twilioAuthToken;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const http = require('http');
const db = require("../models");
const updateResponses = require("./customerResponses");

module.exports = app => {

    //establish customerResponses array on server start.
    let customerResponses = [];
    updateResponses()
        .then(responses => {
            customerResponses = responses;
        })
        .catch(err => console.log(err));


    //Update the customer response array. This should get called when a user makes change to their responses on their profile page.
    //This should ultimately be updated to accept a user ID so that it doesn't force us to go through the entire user database.
    app.get("/api/twilio/updateCustomerResponses", (req, res) => {
        updateResponses()
            .then(responses => {
                customerResponses = responses;
                res.json("Customer Responses Updated!");
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    });

    // app.get("/api/twilio/sendTestMessage", (req, res) => {
    //     client.messages
    //         .create({
    //             body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    //             from: '+16193044042',
    //             to: '+13165126503'
    //         })
    //         .then(message => {
    //             res.json(message);
    //         })
    //         .catch(err => res.json(err));
    // })

    app.post("/api/twilio/sms", (req, res) => {
        //Check to see if an unfinished text exists with that incoming number.
        db.Text
            .find({ customerPhonenumber: req.body.From, reviewComplete: false })
            .then(dbText => {
                //Pulls the relevant customer responses from the cached array.
                if (dbText.length > 0) {
                    let currentCustomer = customerResponses.filter(response => {
                        if (String(dbText[0].userid) === String(response.id)) {
                            return true
                        } else return false
                    })
                    //if it does, find what step we are at
                    //check if the message is just a number. If it is, respond back with a message prompting them for a review.
                    //could implement other checking on the message to ensure it's a valid review. I'm not sure how to do that yet, though.
                    if (isNaN(req.body.Body)) {
                        //If they sent back a valid review, thank them and add the review to the userComment section of the document
                        //Also closes out the document by marking review complete true because it is now finished.
                        db.Text
                            .findOneAndUpdate({ _id: dbText[0]._id }, {
                                userComment: req.body.Body,
                                $push: { messages: { textBody: req.body.Body } },
                                reviewComplete: true,
                                reviewValid: true
                            })
                            .then(updatedDbText => {
                                const twiml = new MessagingResponse();
                                twiml.message(currentCustomer[0].comResValid);
                                res.writeHead(200, { 'Content-Type': 'text/xml' });
                                res.end(twiml.toString());
                            })
                            .catch(err => console.log(err));
                    }
                    //handling if they just sent back a number instead of an actual review.
                    //Also pushes their message into the messages array for later review if needed.
                    else {
                        db.Text
                            .findOneAndUpdate({ _id: dbText[0]._id }, { $push: { messages: { textBody: req.body.Body } } })
                            .then(updatedDbText => {
                                const twiml = new MessagingResponse();
                                twiml.message(currentCustomer[0].comResInvalid);
                                res.writeHead(200, { 'Content-Type': 'text/xml' });
                                res.end(twiml.toString());
                            })
                            .catch(err => console.log(err));
                    }
                }
                //if it doesn't then create a new text. Search for the locations matching the number the text was sent to
                else {
                    //Find the associated location by the phonenumber the consumer texted
                    db.Location
                        .findOne({ phonenumber: req.body.To })
                        .then(dbLocation => {
                            //Pulls the relevant customer responses from the cached array.
                            let currentCustomer = customerResponses.filter(response => {
                                if (String(dbLocation.userid) === String(response.id)) {
                                    return true
                                } else return false
                            })
                            //create new text in the database
                            db.Text.create({
                                customerPhonenumber: req.body.From,
                                locationPhonenumber: req.body.To,
                                messages: [
                                    { textBody: req.body.Body }
                                ],
                                reviewValid: true,
                                rating: parseInt(req.body.Body.trim()),
                                userid: dbLocation.userid
                            })
                                //If the 1-10 review was succesfully added to the database, send this.
                                .then(newDbText => {
                                    const twiml = new MessagingResponse();
                                    twiml.message(currentCustomer[0].surResValid);
                                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                                    res.end(twiml.toString());
                                })
                                //If the review was not 1-10, the database won't add it and will return an error.
                                //We respond with this message prompting the user to try again.
                                .catch(err => {
                                    console.log(err);
                                    const twiml = new MessagingResponse();
                                    twiml.message(currentCustomer[0].surResInvalid);
                                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                                    res.end(twiml.toString());
                                });

                        })
                        .catch(err => console.log(err));
                }
            })

    });



}