const Post = require("../../models/Post");
const Club = require("../../models/Club");

const deletePost = async (req,res,next) => {
    try{
        const {id} = req.params;
        const post= await Post.findById(id);
        if(!post){
            return res.status(404).json({message : "post not found"});
        }

        const club = await Club.findById(ppst.club);
        if(req.user.role !== "admin" && club.clubHead.toString()!== req.user._id.toString()){
            return res.status(403).json({message : "not authorised"});
        }

        await post.deleteOne();

        if(club.totalPosts > 0){
            club.totalPosts -= 1;
            await club.save();
        }

        res.status(200).json({message : "post deleted successfullyy"});

    }
    catch(err){
        next(err);
    }
}
module.exports = deletePost;