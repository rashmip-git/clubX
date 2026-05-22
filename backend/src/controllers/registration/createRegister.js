const registration = require("../../models/Registration");
const event = require("../../models/Event");

const createRegister = async(req,res,next) => {
    try{
        const {eventId} = req.body;

        const e = await event.findById(eventId);
        if(!e){
            return res.status(404).json({message : "event not found"});
        }

        const existing = await registration.findOne({user : req.user._id,
            event : eventId
        });
        if(existing){
            return res.status(400).json({message : "Already registered for this event!!"});
        }

        if(new Date() > e.registrationDeadline){
            return res.status(400).json({message : "sorry registration is closed"});
        }

        const r = await registration.create({
            user : req.user._id,
            event : eventId
        });

        res.status(201).json({message : "registered successfully!!",r});


    }
    catch(err){
        next(err);
    }
}

module.exports = createRegister;