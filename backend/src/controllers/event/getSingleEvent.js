const Event = require("../../models/Event");
const getSingleEvent = async (req,res,next) => {
    try {
        const { id } = req.params;
        const event =  await Event.findById(id)
            .populate(
                "club",
                "clubName logo"
            )
            .populate(
                "createdBy",
                "username profileImage"
            );
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            event
        });
    }
    catch (err) {
        next(err);
    }
};
module.exports = getSingleEvent;