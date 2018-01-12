var mongoose = require("mongoose");

//Creating Schema
var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            //Model which we refer to
            ref: "User"
        },
        username: String
    }
    
});


module.exports = mongoose.model("Comment", commentSchema);