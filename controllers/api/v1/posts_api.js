const Post = require('../../../models/post');
const Comment = require('../../../models/comments');

module.exports.index = async function(req, res){
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        });

        return res.status(200).json({
            message : "Users Posts",
            post : posts
        });
    } catch (error) {
        console.log('Error : ', error);
        return res.status(500).json({
            message : "Internal Server Error"
        });        
    }
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post : req.params.id});

            console.log('Post and comments deleted.');
            return res.status(200).json({
                message : "Successfully deleted the post.",
            });
        }
        
    }catch(error){
        console.log('Error : ', error);
        return res.status(401).json({
            message : "You cannot delete this post."
        });
    }
}