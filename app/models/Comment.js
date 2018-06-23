var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Use the Schema constructor and make a new object
var CommentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;