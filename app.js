var express       = require("express");
var app           = express();
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
var flash         = require("connect-flash");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride =require("method-override");
//Require file with a schema and a model for a campground
var Campground    = require("./models/campground");
//Require file with a schema and a model for a comment
var Comment       = require("./models/comment");
//Require file with a schema for a user
var User          = require("./models/user");
//Require a file with seeds for DB
var seedDB        = require("./seeds");

//REQUIRING FILES WITH ROUTES
var commentRoutes    = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes       = require("./routes/index");


//connecting to db

mongoose.Promise = global.Promise;

//var databaseUri = "mongodb://localhost/yelp_camp";
var databaseUri = "mongodb://aniela:Benedetto16@ds247407.mlab.com:47407/yelpcamp_aniela";
mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Database connected at ${databaseUri}`))
      .catch(err => console.log(`Database connection error: ${err.message}`));


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//using my own stylesheet
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//Every time we start server this file should seed DB
//seedDB();

//PASSPORT CONFIGURATION
 //Requiring and setting in the same line
app.use(require("express-session")({
    //Secret is used to encript sessions, not important what we write here
    secret: "I am cool",
    resave: false,
    saveUninitialized: false,
}));
//Passport set up
app.use(passport.initialize());
app.use(passport.session());
    //Reading sessions and decoding it and encoding it
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//sending info about user if he is logged in and make it work on ALL ROUTES!
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    //setting up flash messages for ALL ROUTES
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//USING REQUIRED FILES WITH ROUTES
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server here");
});