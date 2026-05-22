const event = require("../../models/Event");
const club = require("../../models/Club");

const deleteEvent = async (req,res,next) => {
    try{
        const {id} = req.params;

        const e = await event.findById(id);
        if(!e){
            return res.status(404).json({message : "event not found"});
        }

        const c = await club.findById(e.club);
        if(req.user.role !== "admin" && c.clubHead.toString() !== req.user._id.toString()){
            return res.status(403).json({message : "you are not authorised to delete the event"});
        }

        await e.deleteOne();
        res.status(200).json({message : "event deleted sucessfully!!"});

    }
    catch(err){
       next(err);
    }
}
module.exports = deleteEvent;