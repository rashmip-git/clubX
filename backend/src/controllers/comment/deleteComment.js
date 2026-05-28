const Comment = require("../../models/Comments");

const deleteComment = async (req,res,next) => {
    try{
        const {id} = req.params;
         const comment = await Comment.findById(id);

         if(!comment){
            return res.status(404).json({message : "comment not found"});
         }

          if ( req.user.role !== "admin" && comment.user.toString() !== req.user._id.toString()) {
             return res.status(403).json({
             message: "Not authorized"
      });
    }

    comment.isActive = false;
    await comment.save();

    const post = await Post.findById(comment.post);
    if(post && post.commentsCount>0){
        post.commentsCount -= 1;
        await post.save();
    }


    res.status(200).json({
        message : "comment deleted"
        
    });

    }
    catch(err){
        next(err);
    }
}
module.exports = deleteComment;