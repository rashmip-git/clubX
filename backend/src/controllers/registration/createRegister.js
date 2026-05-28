const Registration = require("../../models/Registration");
const Event = require("../../models/Event");

const createRegister = async(req,res,next) => {
    try{
        const {eventId} = req.body;

        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({message : "event not found"});
        }

        const existing = await Registration.findOne({user : req.user._id,
            event : eventId
        });
        if(existing){
            return res.status(400).json({message : "Already registered for this event!!"});
        }

        if(new Date() > event.registrationDeadline){
            return res.status(400).json({message : "sorry registration is closed"});
        }

        const registration = await Registration.create({
            user : req.user._id,
            event : eventId

        });

        event.attendeesCount += 1;
        await event.save();


        res.status(201).json({message : "registered successfully!!",registration});


    }
    catch(err){
        next(err);
    }
}

module.exports = createRegister;