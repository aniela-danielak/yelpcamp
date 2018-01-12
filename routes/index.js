//Setting everything using express router
var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


//LANDING ROUTE
router.get("/", function(req, res){
    res.render("landing");
    
});

//==============================================
//AUTHENTICATION ROUTES
//==============================================

//REGISTER - show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//REGISTER - handle sign up logic
router.post("/register", function(req, res){
   //passport local mongoose gives the method of register
   var newUser =  new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.redirect("/register");
       } else {
           //logging in new user by the method of authenticate
           passport.authenticate("local")(req, res, function(){
               req.flash("success", "Welcome to YelpCamp" + user.username);
               res.redirect("/campgrounds");
             });
       }
    });
});

//LOGIN - show login form
router.get("/login", function(req, res){
    res.render("login");
});

//LOGIN - handle login form using middleware provided by passport: app.post("/where", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    
    }), function(req, res){
});

//LOGOUT - get request and method premade from passportS
router.get("/logout", function(req, res){
    //method from passport
    req.logout();
    req.flash("success", "You have been logged out");
    res.redirect("/campgrounds");
});


module.exports = router;