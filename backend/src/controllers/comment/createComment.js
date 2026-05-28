const Comment = require("../../models/Comments");
const Post = require("../../models/Post");

const createComment = async (req,res,next) => {
    try{
        const {postId} = req.params;
        const {text,parentComment} = req.body;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message:"post not found"});
        }

        const comment = await Comment.create({
            post : postId,
            user : req.user._id,
            text,
            parentComment
        });

         post.commentsCount += 1;
         await post.save();

        res.status(201).json({
            message : "comment added successfully!!",comment
        });

    }
    catch(err){
        next(err);
    }
}
module.exports = createComment;