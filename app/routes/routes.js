var path = require("path");
var axios= require("axios");

module.exports = function(app) {
/********************
    Mongoose handlers
 ********************/

  // Route to save our favorited song to mongoDB via mongoose
  app.post("/api/favorites", function(req, res) {
    // req.body should include title , artist, song_id, image url, lyrics page url
    // send it to our smartlyrics api:
    axios.post("https://smartlyricsapi.herokuapp.com/api/favorites",req.body)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    })

// Route to retrieve and show favorited articles
app.get("/api/favorites", function(req,res){
  // find favorites of currently logged-in user
  axios.get("https://smartlyricsapi.herokuapp.com/api/favorites")
    .then(function(response){
        res.json(response.data)
    })
    .catch(function (error) {
        console.log(error);
  });
});

// Route to remove favorited article
app.get("/api/remove/:id", function(req,res){
  axios.get(`https://smartlyricsapi.herokuapp.com/api/remove/${req.params.id}`)
  .then(function(response){
      console.log("remove song raw response:",response.data);
      res.send(response.data)
  })
  .catch(function (error) {
      console.log(error);
  });
})

/****************
Genius api handlers
******************/
// send search terms to my api, which are then sent off to Genius api
app.post("/api/search/", function(req, res) {
    axios.post("https://smartlyricsapi.herokuapp.com/api/search",req.body)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    });

 // search for annotations on lyrics panels
app.get("/api/annotation/:id", function(req, res) {
    axios.get(`https://smartlyricsapi.herokuapp.com/api/annotation/${req.params.id}`)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    });

// scrape lyrics -- this is for DEMO only. Genius API prohibits scraping for lyrics in production apps
app.post("/api/lyrics/", function(req, res) {
    axios.post("https://smartlyricsapi.herokuapp.com/api/lyrics",req.body)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    });





 /* GET Home Page */
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});
}; // end module export


