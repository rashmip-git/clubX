const post = require("../../models/Post");

const getClubPosts = async(req,res,next) => {
    try{
        const {clubId} = req.params;

        const p = await post.find({club : clubId})
        .populate("createdBy","username")
        .sort({createdAt : -1});

        res.status(200).json({
            count : p.length,
            p
        });
    }
    catch(err){
        next(err);
    }
};
module.exports = getClubPosts;