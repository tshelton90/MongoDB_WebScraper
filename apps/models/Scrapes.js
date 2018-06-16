var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Creating UserSchema object
var ArticleSchema = new Schema({
    //title of the article
    title: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String
    },

    link: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    saved: {
        type: Boolean,
        default: false
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// This uses mongooses model method to create the models
var Article = mongoose.model("Article", ArticleSchema);

//Export the model
module.exports = Article;