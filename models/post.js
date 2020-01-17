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
    }
}, { 
    timestamps : true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;