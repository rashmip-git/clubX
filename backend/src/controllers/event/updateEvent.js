const event = require("../../models/Event");
const club = require("../../models/Club");

const updateEvent = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const e = await event.findById(id);
        if(!e){
            return res.status(404).json({message : "event not found"});
        }

        const c = await club.findById(e.club);
        if( req.user.role !== "admin" && c.clubHead.toString() !== req.user._id.toString()){
            return res.status(403).json({message : "you are not authorised to update this event"});
        }

        const u = await event.findByIdAndUpdate(id,req.body, { new : true,runValidators:true});

        return res.status(200).json({message : "event updated successfully!!", e : u});



    }
    catch(err){
        next(err);
    }
}
module.exports = updateEvent;