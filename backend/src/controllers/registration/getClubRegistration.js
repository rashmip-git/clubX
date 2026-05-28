const Registration = require("../../models/Registration");
const Event = require("../../models/Event");
const Club = require("../../models/Club");

const getClubRegistration = async (req,res,next) =>{
    try{
        const {clubId} = req.params;
        const club = await Club.findById(clubId);

        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }
         if(req.user.role !== "admin" && club.clubHead.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        const event = await Event.find({club : clubId});
        const eventId = e.map(e=>e._id);
        const registration = await Registration.find({event : {$in : eventId}}).populate("user","username email").populate("event","title date");

        res.status(200).json({count : registration.length,registration});

    }
    catch(err){
        next(err);
    }
}
module.exports = getClubRegistration;