// ==================================================
// DEPENDENCIES
//===================================================

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// =================================================
// EXPRESS boilerplate
// =================================================
// Tells node that we are creating an "express" server
var app = express();

// Static directory
app.use(express.static(__dirname + "/app/public"));

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// for mongoose logging
app.use(logger("dev"));

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// dev tool: environment processor
require('dotenv').config()


// ===================================================
// ROUTERS
// geniusApi routes handle requests to the Genius api.
// ===================================================

require("./app/api/geniusApi")(app);
require("./app/api/mongooseApi")(app);
require("./app/api/htmlRoutes")(app);

// We'll need mongoose calls from the get-go in this app, so we'll go ahead and put them here on the server file

// it would be nice to have promise behavior for simpler code
mongoose.Promise = Promise;

// local or deployed? Use the right mongo db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/smartypants" );

// Hook mongoose connection to db
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
}); 


// ==================================================
// start our server
// ==================================================
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});
