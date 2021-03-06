const Post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/user');

module.exports.create = async (req, res)=>{
    try {
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id,
            name : req.body.name
        });


        if(req.xhr){
            return res.status(200).json({
                newData : {
                    post : post
                },
                message : 'Post Created!'
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    } catch (error) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async (req, res)=>{

    try {
       let post = await Post.findById(req.params.id);
       
        if(post.user == req.user.id){
            post.remove(); 
            await Comment.deleteMany({post : req.params.id});
        
            if(req.xhr){
                return res.status(200).json({
                    newData : {
                        post_id : req.params.id
                    },
                    message : 'Post deleted'
                });
            }

            req.flash('success', 'Post and comments deleted!');
            return res.redirect('back');
       }
    } catch (error) {
       
        req.flash('err', 'You cannot delete this post!');        
        return res.redirect('back');
    }
}