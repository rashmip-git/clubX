const Post = require("../../models/Post");

const getfeed = async (req,res,next) => {
    try{
        const {page=1,limit = 10,pinned,club} = req.query;
        const filter = {
            isActive: true
        };
        if (pinned === "true") {
            filter.isPinned = true;
        }
        if (club) {
            filter.club = club;
        }
        const skip = (page-1) * parseInt(limit);

        const posts = await Post.find(filter)
        .populate("club", "clubName")
      .populate("createdBy", "username")
      .populate("taggedEvent","title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

      const total = await Post.countDocuments(filter);

      res.status(200).json({
        total,
        page : Number(page),
        pages : Math.ceil(total/limit),
        count : p.length,
        posts
      });

    }
    catch(err){
        next(err);
    }
};
module.exports = getfeed;