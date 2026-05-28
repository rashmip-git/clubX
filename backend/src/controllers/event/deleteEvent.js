const Event = require("../../models/Event");
const Club = require("../../models/Club");

const deleteEvent = async (req,res,next) => {
    try{
        const {id} = req.params;

        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({message : "event not found"});
        }

        const club = await Club.findById(event.club);
        if(req.user.role !== "admin" && club.clubHead.toString() !== req.user._id.toString()){
            return res.status(403).json({message : "you are not authorised to delete the event"});
        }
        if(club.totalEvents > 0){
    club.totalEvents -= 1;
    await club.save();
}

        await event.deleteOne();
        res.status(200).json({message : "event deleted sucessfully!!"});

    }
    catch(err){
       next(err);
    }
}
module.exports = deleteEvent;