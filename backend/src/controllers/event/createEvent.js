const event = require("../../models/Event");
const club = require("../../models/Club");

const createEvent = async(req,res,next) => {
    try{
        const {title,description,date,registrationDeadline,location,club : clubId} = req.body;

        const c = await club.findById(clubId);
        if(!c){
            return res.status(404).json({message: "club not found"});
            
        }

        if( req.user.role !== "admin" && c.clubHead.toString() !== req.user._id.toString()){
            return res.status(403).json({message : "you are not authorised to create an event "});
        }

        const e = await event.create({
            title,date,description,location,club,createdBy : req.user._id
        });

        res.status(201).json({message : "event created sucessfully!!",
            e
        });

    }
    catch(err){
        next(err);
    }
}
module.exports = createEvent;