var mongoose = require("mongoose");


//Making SCHEMA

var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
    ]
});

//Defining a model to have methods on this pattern

module.exports = mongoose.model("Campground", campgroundSchema);
