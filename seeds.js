var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Rest", 
        image: "https://farm5.staticflickr.com/4470/36723988354_ee2085f197.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rutrum tellus pellentesque eu tincidunt. Eu augue ut lectus arcu. Nisl purus in mollis nunc sed. Enim eu turpis egestas pretium aenean. Sit amet aliquam id diam maecenas. Congue quisque egestas diam in arcu cursus euismod quis viverra. Id volutpat lacus laoreet non curabitur gravida. Condimentum id venenatis a condimentum. Vitae ultricies leo integer malesuada nunc vel risus commodo. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Nullam vehicula ipsum a arcu cursus vitae congue. Eu volutpat odio facilisis mauris sit amet massa vitae. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor. At in tellus integer feugiat scelerisque varius. Vitae justo eget magna fermentum iaculis eu non diam. Nunc eget lorem dolor sed.",
    },
    {
        name: "Tree House", 
        image: "https://farm1.staticflickr.com/97/216334734_12c2572fec.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rutrum tellus pellentesque eu tincidunt. Eu augue ut lectus arcu. Nisl purus in mollis nunc sed. Enim eu turpis egestas pretium aenean. Sit amet aliquam id diam maecenas. Congue quisque egestas diam in arcu cursus euismod quis viverra. Id volutpat lacus laoreet non curabitur gravida. Condimentum id venenatis a condimentum. Vitae ultricies leo integer malesuada nunc vel risus commodo. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Nullam vehicula ipsum a arcu cursus vitae congue. Eu volutpat odio facilisis mauris sit amet massa vitae. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor. At in tellus integer feugiat scelerisque varius. Vitae justo eget magna fermentum iaculis eu non diam. Nunc eget lorem dolor sed.",
    },
    {
        name: "Farm Rest", 
        image: "https://farm4.staticflickr.com/3805/9667057875_90f0a0d00a.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rutrum tellus pellentesque eu tincidunt. Eu augue ut lectus arcu. Nisl purus in mollis nunc sed. Enim eu turpis egestas pretium aenean. Sit amet aliquam id diam maecenas. Congue quisque egestas diam in arcu cursus euismod quis viverra. Id volutpat lacus laoreet non curabitur gravida. Condimentum id venenatis a condimentum. Vitae ultricies leo integer malesuada nunc vel risus commodo. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Nullam vehicula ipsum a arcu cursus vitae congue. Eu volutpat odio facilisis mauris sit amet massa vitae. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor. At in tellus integer feugiat scelerisque varius. Vitae justo eget magna fermentum iaculis eu non diam. Nunc eget lorem dolor sed.",
    },
    ]

function seedDB(){
    //Remove all campgrounds from DB
        Campground.remove({}, function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Removed");
                 //Add a few campgrounds
                data.forEach(function(seed){
                    Campground.create(seed, function(err, campground){
                        if(err){
                            console.log(err);
                        } else {
                            console.log("added a campground")
                            //Create a comment
                            Comment.create(
                                {
                                    text: "This place is great",
                                    author: "Homer"
                                    
                                }, function(err, comment){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        //assosiate created comment with a campground
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("Created a new comment");
                                    }
                                    
                                });
                        }
                    });
                });
            }
         });
        
        }    
  
   
    

module.exports = seedDB;
