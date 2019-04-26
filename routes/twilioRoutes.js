//Twilio setup
const accountSid = process.env.twilioAccountSID;
const authToken = process.env.twilioAuthToken;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const http = require('http');
const db = require("../models");


module.exports = app => {


    app.get("/api/twilio/sendTestMessage", (req, res) => {
        client.messages
            .create({
                body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
                from: '+16193044042',
                to: '+13165126503'
            })
            .then(message => {
                res.json(message);
            })
            .catch(err => res.json(err));
    })

    app.post("/api/twilio/sms", (req, res) => {
        console.log(req.body);
        //Default response that will be sent to the consumer.
        let responseToSend = "Starting message";

        //Search for existing Texts by incoming telephone number
        db.Text
            .find({ customerNumber: req.body.From })
            .then(dbText => {
                console.log("Initial DB Query");
                console.log(dbText);
                //Check if any records from the incoming number exist and are not complete.
                unfinishedTexts = dbText.filter(text => !text.reviewComplete);
                if (unfinishedTexts.length > 0) {
                    //Add the incoming message to the text and then send it to handleIncomingMessage
                    db.Text
                        .findOneAndUpdate({_id: unfinishedTexts[0]._id}, {$push: {messages: req.body.Body}}, {new: true})
                        .then(dbText => {
                            responseToSend = handleIncomingMessage(dbText).bind ;
                            const twiml = new MessagingResponse();
                            twiml.message(responseToSend);
                            res.writeHead(200, { 'Content-Type': 'text/xml' });
                            res.end(twiml.toString());
                        })
                        .catch(err => console.log(err));
                }
                //If they don't exist...
                else {
                    //Add the new Text to database
                    db.Text
                        .create({
                            customerNumber: req.body.From,
                            clientNumber: req.body.To,
                            messages: [req.body.Body]
                        })
                        .then(dbText => {
                            console.log("Newly created Text");
                            console.log(dbText);
                            responseToSend = handleIncomingMessage(dbText);
                            const twiml = new MessagingResponse();
                            twiml.message(responseToSend);
                            res.writeHead(200, { 'Content-Type': 'text/xml' });
                            res.end(twiml.toString());
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err));


    });
    
    function handleIncomingMessage(text) {
        console.log("Text from inside handleIncomingMessage");
        console.log(text);
        if (text.storeNumber === 0) {
            return "Send a store number!"
        }
        else return "Default"
    }

}