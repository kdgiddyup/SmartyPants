var path = require("path");

module.exports = function(app) {
    // sends user info back to front end
    // app.get("/user", function(req, res){
    //     res.json({user:req.user});
    // });

    /* GET Home Page */
	app.get("/", function(req, res){
		res.sendFile(path.join(__dirname, "/../public/home.html"));
	});
}


