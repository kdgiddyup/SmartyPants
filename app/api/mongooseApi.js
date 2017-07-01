// we'll need our Favorite model
var Favorite = require("../models/favorite.js");

var path = require("path"); 

module.exports = function(app) {

// Route to save our favorited song to mongoDB via mongoose
app.post("/api/favorite", function(req, res) {
    // expects song title and song_id
  var favorite = new Favorite(req.body);

  // With the new "Favorite" object created, we can save our data to mongoose
  favorite.save(function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Otherwise, send success and song_id message back
    else {
      res.json({message:true,song_id:req.body.song_id});
    }
  });
});


// Route to retrieve and show favorited articles
app.get("/api/favorites", function(req,res){
  Favorite.find({}, function(err, found){
    if(err){
      console.log(err);
    }
    else{
      res.json(found);
    }
  });
});

// Route to remove favorited article
app.get("/api/remove/:id", function(req,res){
  Favorite.remove({song_id: req.params.id}, function(err){
    if (err) {
      console.log('There was an error unfavoriting document:',err);
    };
    res.json({song:req.params.id});
   });
})


};
