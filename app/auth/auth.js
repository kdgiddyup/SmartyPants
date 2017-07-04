// use axios to post to my api with ajax-like calls
var axios= require("axios");


// these resources will change depending on environment
var resourceHost = process.env.DEV_API || "https://smartlyricsapi.herokuapp.com";

module.exports = function(app) {

// Route to send user sign-up info to smartlyricsapi
  app.post("/api/signup", function(req, res) {
    console.log("sign up route, to:",resourceHost);
    // req.body should include username and password
    // send it to our smartlyrics api:
    axios.post(`${resourceHost}/api/signup`,req.body)
        .then(function(response){
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    })


    app.post("/api/login", function(req, res) {
        console.log("log in route, to:",resourceHost);
        axios.post(`${resourceHost}/api/login`,req.body).then(function(response){
            res.json(response.data);
        })
        .catch(function(error) {
            console.log(error)
        });
    });

}