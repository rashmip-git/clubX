const comment = require("../../models/Comments");
const post = require("../../models/Post");

const createComment = async (req,res,next) => {
    try{
        const {postId} = req.params;
        const {text} = req.body;

        const p = await post.findById(postId);

        if(!p){
            return res.status(404).json({message:"post not found"});
        }

        const c = await comment.create({
            post : postId,
            user : req.user._id,
            text
        });

        res.status(201).json({
            message : "comment added successfully!!",c
        });

    }
    catch(err){
        next(err);
    }
}
module.exports = createComment;