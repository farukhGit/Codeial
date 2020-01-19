const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async (req, res)=>{
    try {
        await Post.create({
            content : req.body.content,
            user : req.user._id
        });
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

        await Comment.deleteMany({post : req.user.id}); 
        req.flash('success', 'Post and comments deleted!');
        return res.redirect('back');
       }
    } catch (error) {
        req.flash('err', 'You cannot delete this post!');        
        return res.redirect('back');
    }
}