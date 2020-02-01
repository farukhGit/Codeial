const Comment = require('../models/comments');
const Post = require('../models/post')
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_workers');
const queue = require('../config/kue');

module.exports.create = async (req, res)=>{
    let post = await Post.findById(req.body.post);
        
        if(post){
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });

            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'username email').execPopulate(); 
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error creating a queue.');
                    return;
                }
                console.log('job enqueued : ', job.id);
            });



            res.redirect('/');
        }
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