require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan'); // used to see requests
const PORT = process.env.PORT || 3001;

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error(err));

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

 // Serve up static assets (usually on heroku)
 if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// User Create Routes
require("./routes/userCreateRoutes")(app);

// Twilio Routes
require("./routes/twilioRoutes")(app);

// Send every request to the React app
// Define any API routes before this runs
require("./routes/apiRoutes.js")(app);
// require("./routes/htmlRoutes.js")(app);   
require("./routes/dashRoutes.js")(app); 

app.get("*", function(req, res) {
  //res.sendFile(path.join(__dirname, "./client/build/index.html"));
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
