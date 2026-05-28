const Event = require("../../models/Event");
const Club = require("../../models/Club");

const createEvent = async(req,res,next) => {
    try{
        const {title,description,date,registrationDeadline,location,club : clubId,
            category,bannerImage,mode,tags,} = req.body;

        const club = await Club.findById(clubId);
        if(!club){
            return res.status(404).json({message: "club not found"});
            
        }

        if( req.user.role !== "admin" && club.clubHead.toString() !== req.user._id.toString()){
            return res.status(403).json({message : "you are not authorised to create an event "});
        }

        const event = await Event.create({
            title,date,registrationDeadline,category,bannerImage,mode,tags,description,location,club : clubId,createdBy : req.user._id
        });

        club.totalEvents += 1;
        await club.save();

        res.status(201).json({message : "event created sucessfully!!",
            event
        });

    }
    catch(err){
        next(err);
    }
}
module.exports = createEvent;