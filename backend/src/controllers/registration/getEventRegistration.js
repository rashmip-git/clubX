const registration = require("../../models/Registration");
const event = require("../../models/Event");

const getEventRegistration = async (req,res,next) =>{
    try{
        const {eventId} = req.params;

        const e = await event.findById(eventId).populate("club");
        if(!e){
            return res.status(404).json({message : "event not found!!"});
        }

        if(req.user.role != "admin" && e.club.clubHead.toString()!== req.user._id.toString()){
            return res.status(403).json({message : "not authorised!!"});
        }

        const r = await registration.find({event : eventId}).populate("user","username email");

        res.status(200).json({count : r.length,r});

    }
    catch(err){
        next(err);
    }

}
module.exports = getEventRegistration;