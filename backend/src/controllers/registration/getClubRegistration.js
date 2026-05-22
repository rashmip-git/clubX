const registration = require("../../models/Registration");
const event = require("../../models/Event");
const club = require("../../models/Club");

const getClubRegistration = async (req,res,next) =>{
    try{
        const {clubId} = req.params;
        const c = await club.findById(clubId);

        if (!c) {
            return res.status(404).json({ message: "Club not found" });
        }
         if(req.user.role !== "admin" && c.clubHead.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        const e = await event.find({club : clubId});
        const eventId = e.map(e=>e._id);
        const r = await registration.find({event : {$in : eventId}}).populate("user","username email").populate("event","title date");

        res.status(200).json({count : r.length,r});

    }
    catch(err){
        next(err);
    }
}
module.exports = getClubRegistration;