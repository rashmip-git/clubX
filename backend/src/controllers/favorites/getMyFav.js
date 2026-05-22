const fav = require("../../models/Favorites");

const getMyFavorite = async (req,res,next) => {
    try{
        const f = await fav.find({ user: req.user._id })
      .populate({
        path: "event",
        populate: {
          path: "club",
          select: "clubName"
        }
      });

    res.status(200).json({
      count: f.length,
      f
    });
    }
    catch(err){
        next(err);
    }

}
module.exports = getMyFavorite;
