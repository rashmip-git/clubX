const Post = require("../../models/Post");

const toggleLike = async (req,res,next) => {
    try{
        const {postId} = req.params;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message : "post not found"});
        }

        const alreadyLiked = post.likes.includes(req.user._id);

        if(alreadyLiked){
            post.likes = post.likes.filter(userId => userId.toString()!==req.user._id.toString());
        
           post.likesCount = Math.max(0,post.likesCount -1);
        await post.save();

         return res.status(200).json({

                message: "Post unliked",
                liked: false,
                likesCount: post.likesCount
            });
        }

         post.likes.push(req.user._id);
         post.likesCount += 1;
         await post.save();
        res.status(200).json({ message: "Post liked", liked: true,likesCount: post.likesCount });
    }
    catch(err){
        next(err);
    }
}
module.exports = toggleLike;