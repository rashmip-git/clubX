const review = require("../../models/Review");
const event = require("../../models/Event");
const registration = require("../../models/Registration");

const createReview = async (req,res,next) => {
    try{
        const {eventId} = req.params;
        const {rating} = req.body;
        
        //check event exists
        const e = await event.findById(eventId);
        if(!e){
            return res.status(404).json({message : "Event not found"});
        }


        //check event completed
        if(new Date() < new Date(e.date)){
            return res.status(400).json({message : "Event not completed yet"})
        }


        //check user registerd
        const r = await registration.findOne({
            user : req.user._id,
            event : eventId
        });
        if(!r){
            return res.status(404).json({message : "Not registered to review this event"});
        }


        const c = await review.create({
            user : req.user._id,
            event : eventId,
            ratings
        });

        res.status(201).json({message : "Review added successfully!!",c});



    }
    catch(err){
        next(err);
    }

}
module.exports = createReview;