const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async (req, res)=>{
    try {
        await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        return res.redirect('back');

    } catch (error) {
        console.log('Error : ', err);
        return;
    }
}

module.exports.destroy = async (req, res)=>{

    try {
       let post = await Post.find(req.params.id);
       
       if(post.user == req.user.id){
        post.remove();

        await Comment.deleteMany({post : req.user.id}); 
        return res.redirect('back');
       }
    } catch (error) {
        console.log('Error : ', err);
        return;
    }
}