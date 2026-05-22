const comment = require("../../models/Comments");

const deleteComment = async (req,res,next) => {
    try{
        const {id} = req.params;
         const c = await comment.findById(id);

         if(!c){
            return res.status(404).json({message : "comment not found"});
         }

          if ( req.user.role !== "admin" && c.user.toString() !== req.user._id.toString()) {
             return res.status(403).json({
             message: "Not authorized"
      });
    }

    await c.deleteOne();

    res.status(200).json({
        message : "comment deleted"
        
    });

    }
    catch(err){
        next(err);
    }
}
module.exports = deleteComment;