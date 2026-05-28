const User = require("../../models/User");

const getMyProfile = async (req,res,next) => {
    try {
        const user = await User.findById(req.user._id).select("-password").populate(
                "joinedClubs",
                "clubName logo category"
            )
            .populate({
                path: "savedPosts",
                populate: {
                    path: "club",
                    select: "clubName logo"
                }
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    }

    catch (err) {

        next(err);

    }

};

module.exports = getMyProfile;