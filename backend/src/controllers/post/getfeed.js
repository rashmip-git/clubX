const post = require("../../models/Post");

const getfeed = async (req,res,next) => {
    try{
        const {page=1,limit = 10} = req.query;
        const skip = (page-1) * parseInt(limit);

        const p = await post.find()
        .populate("club", "clubName")
      .populate("createdBy", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

      const total = await post.countDocuments();

      res.status(200).json({
        total,
        page : Number(page),
        pages : Math.ceil(total/limit),
        count : p.length,
        p
      })

    }
    catch(err){
        next(err);
    }
};
module.exports = getfeed;