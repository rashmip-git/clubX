const post = require("../../models/Post");
const club = require("../../models/Club");

const deletePost = async (req,res,next) => {
    try{
        const {id} = req.params;
        const p = await post.findById(id);
        if(!p){
            return res.status(404).json({message : "post not found"});
        }

        const c = await club.findById(p.club);
        if(req.user.role !== "admin" && c.clubHead.toString()!== req.user._id.toString()){
            return res.status(403).json({message : "not authorised"});
        }

        await p.deleteOne();

        res.status(200).json({message : "post deleted successfullyy"});

    }
    catch(err){
        next(err);
    }
}
module.exports = deletePost;