// for testing only; this would be deprecated when react elements are built
var path = require("path");  

module.exports = function(app) {
    // default route for serving home.html; would be deprecated when react components are added
    app.get("/",function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });

}