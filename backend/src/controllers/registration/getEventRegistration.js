const Registration = require("../../models/Registration");
const Event = require("../../models/Event");

const getEventRegistration = async (req,res,next) =>{
    try{
        const {eventId} = req.params;

        const event = await Event.findById(eventId).populate("club");
        if(!event){
            return res.status(404).json({message : "event not found!!"});
        }

        if(req.user.role != "admin" && event.club.clubHead.toString()!== req.user._id.toString()){
            return res.status(403).json({message : "not authorised!!"});
        }

        const registration = await Registration.find({event : eventId}).populate("user","username email");

        res.status(200).json({count : registration.length,registration});

    }
    catch(err){
        next(err);
    }

}
module.exports = getEventRegistration;