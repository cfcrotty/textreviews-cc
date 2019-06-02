// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC471663ec90de809d2bb6e2372678dcfd';
const authToken = '2169bac867835e6c34e23e0ec15ff1df';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     to: '+12405466255',
     from: '+17034239448'
   })
  .then(message => console.log(message.sid));