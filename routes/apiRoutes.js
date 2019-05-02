const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
const auth = require("../config/auth");
const moment = require("moment");
const ObjectId = require('mongoose').Types.ObjectId


// LOGIN ROUTE
module.exports = app => {

  app.post('/api/login', (req, res) => {
    auth
      .logUserIn(req.body.email, req.body.password)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(400).json(err));
  });

  //I deleted because it is in userCreateRoutes.js - bmt
  // Any route with isAuthenticated is protected and you need a valid token
  // to access
  // app.get('/api/user/:id', isAuthenticated, (req, res) => {
  //   db.User.findById(req.params.id).then(data => {
  //     if (data) {
  //       res.json(data);
  //     } else {
  //       res.status(404).send({ success: false, message: 'No user found' });
  //     }
  //   }).catch(err => res.status(400).send(err));
  // });

  // Any route with isAuthenticated is protected and you need a valid token
  // to access
  app.get('/api/textDetail/', isAuthenticated, (req, res) => {
    db.Text.find({ userid: req.user.id })
      .then(data => {
        // console.log(data)
        res.json(data);
      }).catch(err => res.status(400).send(err));
  });

  app.post("/api/twilio/updateResponses", isAuthenticated, (req, res) => {
    db.User.findOneAndUpdate({ _id: req.user.id }, {
      twilioResponses: {
        surResValid: req.body.surResValid,
        surResInvalid: req.body.surResInvalid,
        comResValid: req.body.comResValid,
        comResInvalid: req.body.comResInvalid
      }
    })
      .then(dbUser => res.json("Responses Updated!"))
      .catch(err => res.json(err))
  })

  //just used to create dummy data for the demonstration
  app.post('/api/createdata/', (req, res) => {


    let passcode = 'sasparilla'  //passcode so no one creates dummy data accidentally

    if (req.body.passcode === 'sasparilla') {
      let user =
      {
        username: 'vernsair',
        email: 'bturksub@gmail.com',
        password: 'password',
        streetaddress: '123 West Elm Ln',
        city: 'San Diego',
        state: 'CA',
        zipCode: '87343',
        twilioResponses: {
          surResValid: "This is a test",
          surResInvalid: "NOTHER TEST",
          comResValid: "BLAH BLAH BLAH",
          comResInvalid: "Hello"
        },
      }

      let locations = [
        {
          locationName: 'Pacific',
          streetAddress: '14 Pacific Dr',
          city: 'La Jolla',
          state: 'CA',
          zipCode: '92037',
          phonenumber: '+16193044042'
        },
        {
          locationName: 'Atlantic',
          streetAddress: '14 Atlantic Ave',
          city: 'El Cajon',
          state: 'CA',
          zipCode: '67047',
          phonenumber: '7603437766'
        },
        {
          locationName: 'West Elm',
          streetAddress: '120 West Elm St',
          city: 'La Jolla',
          state: 'CA',
          zipCode: '92037',
          phonenumber: '8585552323'
        },
        {
          locationName: 'Yankee',
          streetAddress: '30 Yankee Way',
          city: 'La Jolla',
          state: 'CA',
          zipCode: '92037',
          phonenumber: '8585557923'
        }
      ]


      db.User.findOne({
        email: 'bturksub@gmail.com'
      })
        .then(async data => {

          if (!data) {
            data = await createUser(user)
          }

          var goodComments = [
            "I loved my meal",
            "Great service",
            "I had a great time at your business.  Thank you",
            "My food tasted great",
            "Wow, I will make sure to come back again because the food was great",
            "The service was excellent. Really nice people work here",
            "Keep up the good work",
            "Thank you for a great experience.",
            "Well done.  The food was served quickly and tasted great"
          ]

          var badComments = [
            "I hated my meal",
            "Poor service",
            "I had a terrible time at your business.  Thank you for nothing",
            "My food tasted awful",
            "Wow, I will never come back again because the food was horrible",
            "The service was poor. Really rude people work here",
            "Please improve your service",
            "Thanks for nothing.",
            "Poorly done.  The food was served slowly and tasted terrible"
          ]





          //create locations with user id
          var id = data._id
          locations.forEach(item => {

            item.userid = id;
            db.Location.findOne({
              locationName: item.locationName,
              userid: id
            })
              .then(async data => {
                if (!data) { ///not found create
                  data = await createLocation(item)
                }
                else {  //update with correct user
                  data = await updateLocation(item)
                }


                //create texts 
                var numbers = []
                //create 1000 different phone numbers ranging from 555555555 to 999999999
                for (x = 0; x < 10000; x++) {
                  var digits = Math.floor(Math.random() * 9000000000) + 1000000000;
                  numbers.push(digits)

                }

                /*Two types of messages. 
                  2.  Inital send with rating
                  3.  Comment
                */


                var location = item
                var x = 0;
                for (x = 0; x < 200; x++) {
                  //pick random location

                  var customer = numbers[Math.floor(Math.random() * numbers.length)]
                  var rating = Math.floor(Math.random() * 10) + 1

                  var firstDay = moment().subtract(31, 'days')
                  var lastDay = moment().subtract(1, 'days')
                  var daysBetween = lastDay.diff(firstDay, 'days')

                  var randomDay = Math.floor(Math.random() * daysBetween) + 1
                  var firstTime = firstDay.add(randomDay, 'days')
                  var firstTime = firstTime.add(Math.floor(Math.random() * 24), 'hours')
                  var firstTime = firstTime.add(Math.floor(Math.random() * 60), 'minutes')
                  var firstTime = firstTime.add(Math.floor(Math.random() * 60), 'seconds')

                  secondTime = moment(firstTime).add(Math.floor(Math.random() * 60), 'minutes');


                  var comment = ""
                  if (rating < 6) {
                    comment = badComments[Math.floor(Math.random() * badComments.length)]
                  } else {
                    comment = goodComments[Math.floor(Math.random() * goodComments.length)]
                  }


                  var text = {
                    customerPhonenumber: customer,
                    locationPhonenumber: location.phonenumber,
                    messages: [{
                      textBody: rating,
                      timeStamp: firstTime.format()
                    },
                    {
                      textBody: comment,
                      timeStamp: secondTime.format()
                    }],
                    reviewComplete: true,
                    reviewValid: true,
                    rating: rating,
                    userComment: comment,
                    userid: id,
                    createdAt: firstTime.format()
                  }

                  // console.log(data);
                  data = await createText(text)

                }
              })


          })
          res.json(data)
        })

    }
  })



  function createText(text) {
    return new Promise(async function (resolve, reject) {
      db.Text.create(text)
        .then(data => resolve(data))
        .catch(err => resolve(err))
    })
  }


  function createLocation(item) {
    return new Promise(async function (resolve, reject) {
      db.Location.create(item)
        .then(data => {
          db.User.findOneAndUpdate({ _id: item.userid }, { "$push": { locations: data._id } }, { new: true })
            .then(data => resolve(data))
            .catch(err => resolve(err))
        })
        .catch(err => resolve(err))
    })
  }

  function updateLocation(item) {
    return new Promise(async function (resolve, reject) {
      db.Location.findOneAndUpdate({ locationName: item.locationName }, { userid: item.userid }, { new: true })
        .then(data => resolve(data))
        .catch(err => resolve(err))
    })
  }


  function createUser(user) {
    return new Promise(async function (resolve, reject) {
      db.User.create(user)
        .then(data => resolve(data))
        .catch(err => resolve(err))

    })
  }


}
