const User = require("../../models/User");
const updateProfile = async ( req, res, next) => {
    try {
        const allowedUpdates = {
            username: req.body.username,
            bio: req.body.bio,
            department: req.body.department,
            year: req.body.year,
            profileImage: req.body.profileImage,
            interests: req.body.interests,
            skills: req.body.skills,
            socialLinks: req.body.socialLinks
        };

        Object.keys(allowedUpdates)
            .forEach(key => {
                if (
                    allowedUpdates[key] === undefined
                ) {
                    delete allowedUpdates[key];
                }
            });

        const user =
            await User.findByIdAndUpdate(req.user._id, allowedUpdates,
                {
                    new: true,
                    runValidators: true
                }
            ).select("-password");

        res.status(200).json({
            success: true,
            message:
                "Profile updated successfully",
            user
        });
    }
    catch (err) {
        next(err);
    }
};
module.exports = updateProfile;