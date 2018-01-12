//Setting everything using express router
var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=============================================================
//COMMENTS ROUTS - NESTED ROUTS
//=============================================================

//NEW Comment added to a specific campground
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});


//CREATE comments route
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
             //create new comment
             Comment.create(req.body.comment, function(err, comment){
                 if(err){
                     req.flash("error", "Couldn't create a new comment!");
                     console.log(err);
                 } else {
                     //add username and id to the comment before creating it - first part is from comment model file, second from the request of logged user
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     //saving comment
                     comment.save();
                     //connect new comment to campground
                     campground.comments.push(comment);
                     campground.save();
                     //redirect to campground show page
                     req.flash("success", "Your comment was successfully created!");
                     res.redirect("/campgrounds/" + campground._id);
                 }
             });
            
        }
    });
   
});

//EDIT COMMENT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "No campground found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});
 
 //UPDATE COMMENT ROUTE
 router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
         if(err){
             res.redirect("back");
         } else {
             res.redirect("/campgrounds/" + req.params.id);
         }
         
     });
 });

//DESTROY COMMENT ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
            console.log(err);
        } else {
            req.flash("success", "Your comment was successfully deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;