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

module.exports.deleteComment = (req, res)=>{
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let postid = comment.post;

            Post.findByIdAndUpdate(postid, {$pull : {comments : req.params.id}}, (err, post)=>{
                return res.redirect('back');
            })
                   
        }else{
            return res.redirect('back');
        }
    })
}