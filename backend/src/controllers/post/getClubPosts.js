const Post = require("../../models/Post");

const getClubPosts = async(req,res,next) => {
    try{
        const {clubId} = req.params;

        const posts = await Post.find({club : clubId})
        .populate("createdBy","username")
        .populate("taggedEvent","title")
        .sort({createdAt : -1});

        res.status(200).json({
            count : posts.length,
            posts
        });
    }
    catch(err){
        next(err);
    }
};
module.exports = getClubPosts;