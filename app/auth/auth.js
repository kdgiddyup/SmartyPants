// We need to read the mongo db to authenticate users
// set up mongoose connection
var mongoose = require("mongoose");
var MONGODB = process.env.MONGODB_URI || "mongodb://localhost/smartlyrics";

console.log("using this db:",MONGODB);

mongoose.connect(  
  MONGODB,
  { useMongoClient: true}
  );

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose error: ", error);
});

// Once connected to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// we'll need our Favorite and User models
var Favorite = require("../models/favorite");
var User = require("../models/user");

module.exports = function(app) {

    //SIGN IN FROM INDEX PAGE

    /*  example from basic-auth-mongoose docs:
    User.findOne({'username' : 'toms1234'}, function (err, tom) {
    if (err) // handle 
    else {
        tom.authenticate('wrong-password'); // returns false 
        tom.authenticate('secret'); // returns true 
    }
});
*/
    app.post("/login", function(req, res) {
        console.log("Log in attempt with:",req.body);
        User.findOne({'username' : req.body.username}, function (err, user) {
        if (err) console.log(err)
        else {
            if (user.authenticate(req.body.password)) {
                res.json({"success":true,"message":req.body.username})
             } 
            else
                res.json({"success":false,"message":"Unable to log you in. Try again."})
            }
        });
    });

    app.post("/signup", function(req, res){
        console.log("Sign up details:",req.body);
        var newUser = new User(req.body);
        console.log("new user:",newUser);
        newUser.save(function(error){
            if (error) {
                console.log("Save error",error);
                res.json({
                    "success":false,
                    "message": error
                })
            }
            else { 
                console.log("Success",newUser.username);
                res.json({
                    "success":true,
                    "message":req.body.username
                })
            }
        })
    }); // end signup post route

}