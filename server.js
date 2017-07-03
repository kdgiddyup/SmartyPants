// ==================================================
// DEPENDENCIES
//===================================================
const express=require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express()  


// dev tool: environment processor
require('dotenv').config()

// Static directory
app.use(express.static(__dirname + "/app/public"));
// for mongoose logging
app.use(logger("dev"));

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" })); 

// ===================================================
// ROUTES
require("./app/routes/routes")(app);
// ===================================================

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// ==================================================
// start our server
// ==================================================
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});
