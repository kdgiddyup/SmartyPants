var path = require("path");
var axios= require("axios");

// this will change depending on environment
var resourceHost = process.env.DEV_API || "https://smartlyricsapi.herokuapp.com";

console.log("Using this api resource:",resourceHost);

module.exports = function(app) {

/********************
  Mongoose handlers
********************/

  // Route to save our favorited song to mongoDB via mongoose
  app.post("/api/favorites", function(req, res) {
    // req.body should include title , artist, song_id, image url, lyrics page url
    console.log("post favorites route, to:",resourceHost);
    // send it to our smartlyrics api:
    axios.post(`${resourceHost}/api/favorites`,req.body)
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
 console.log("get favorites route, to:",resourceHost);
 axios.get(`${resourceHost}/api/favorites`)
    .then(function(response){
        res.json(response.data)
    })
    .catch(function (error) {
        console.log(error);
  });
});

// Route to remove favorited article
app.get("/api/remove/:id", function(req,res){
  axios.get(`${resourceHost}/api/remove/${req.params.id}`)
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
app.post("/api/search", function(req, res) {
    axios.post(`${resourceHost}/api/search`,req.body)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    });

 // search for annotations on lyrics panels
app.get("/api/annotation/:id", function(req, res) {
    axios.get(`${resourceHost}/api/annotation/${req.params.id}`)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    });

// scrape lyrics -- this is for DEMO only. Genius API prohibits scraping for lyrics in production apps
app.post("/api/lyrics/", function(req, res) {
    axios.post(`${resourceHost}/api/lyrics`,req.body)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    });

// where are the auth routes? app/auth/auth.js is where

 /* GET Home Page */
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});
}; // end module export