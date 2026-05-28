const Comment = require("../../models/Comments");

const getPostComments = async (req,res,next)=>{
    try{
        const {postId} = req.params;

        const comments = await Comment.find({
            post : postId,
            isActive : true
        })
        .populate("user","username")
        .populate("parentComment")
        .sort({createdAt : -1});


        res.status(200).json({
            count : comments.length,
            comments
        });

    }
    catch(err){
        next(err);
    }
}
module.exports = getPostComments;