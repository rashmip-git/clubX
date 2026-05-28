const Club = require("../../models/Club");
const getSingleClub = async (req, res,next) => {
    try {
        const { id } = req.params;
        const club =await Club.findById(id)
        .populate(
                "clubHead",
                "username email profileImage bio"
            )
            .populate(
                "members",
                "username profileImage"
            );
        if (!club) {
            return res.status(404).json({
                success: false,
                message: "Club not found"
            });
        }
        res.status(200).json({
            success: true,
            club
        });
    }

    catch (err) {

        next(err);

    }

};

module.exports = getSingleClub;