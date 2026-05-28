const Event = require("../../models/Event");
const Club = require("../../models/Club");

const updateEvent = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({message : "event not found"});
        }

        const club = await Club.findById(event.club);
        if( req.user.role !== "admin" && club.clubHead.toString() !== req.user._id.toString()){
            return res.status(403).json({message : "you are not authorised to update this event"});
        }

        const updatedEvent = await event.findByIdAndUpdate(id,req.body, { new : true,runValidators:true}).populate("club","clubName");

        return res.status(200).json({message : "event updated successfully!!", event : updatedEvent});
    }
    catch(err){
        next(err);
    }
}
module.exports = updateEvent;