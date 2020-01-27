const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        // for linking to user, type is a reference to User Schema
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // include the array of ids of all comments in this post schema itself
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }   
    ],
    name : {
        type : mongoose.Schema.Types.String,
        ref : 'User'
    }
}, { 
    timestamps : true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;