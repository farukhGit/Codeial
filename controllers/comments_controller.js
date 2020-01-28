const Comment = require('../models/comments');
const Post = require('../models/post')

module.exports.create = (req, res)=>{
    Post.findById(req.body.post, function(err, post){
        
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            }, function(err, comment){
                if(err){
                    throw err;
                }

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    })
}

module.exports.deleteComment = async (req, res)=>{
    try {
        let comment = await Comment.findById(req.params.id);
            
        if(comment.user == req.user.id){
            let postid = comment.post;
            comment.remove();
            
            await Post.findByIdAndUpdate(postid, {$pull : {comments : req.params.id}}, (err, post)=>{
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', 'Can\'t delete this comment.');
        console.log('Cannot delete comment!', error);   
    }
}