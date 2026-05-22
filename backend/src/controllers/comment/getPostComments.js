const comment = require("../../models/Comments");

const getPostComments = async (req,res,next)=>{
    try{
        const {postId} = req.params;

        const c = await comment.find({
            post : postId
        })
        .populate("user","username")
        .sort({createdAt : -1});


        res.status(200).json({
            count : c.length,
            c
        });

    }
    catch(err){
        next(err);
    }
}
module.exports = getPostComments;