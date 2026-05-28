const Review = require("../../models/Review");
const Event = require("../../models/Event");
const Registration = require("../../models/Registration");

const createReview = async (req,res,next) => {
    try{
        const {eventId} = req.params;
        const {rating} = req.body;
        
        //check event exists
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({message : "Event not found"});
        }


        //check event completed
        if(new Date() < new Date(event.date)){
            return res.status(400).json({message : "Event not completed yet"})
        }


        //check user registerd
        const registration = await Registration.findOne({
            user : req.user._id,
            event : eventId
        });
        if(!registration){
            return res.status(404).json({message : "Not registered to review this event"});
        }

        const existingReview = await Review.findOne({
    user: req.user._id,
    event: eventId
});

if(existingReview){
    return res.status(400).json({
        message: "You already reviewed this event"
    });
}


        const review = await Review.create({
            user : req.user._id,
            event : eventId,
            rating
        });

        const reviews =await Review.find({event: eventId});

        const totalReviews = reviews.length;

        const avgRating = reviews.reduce((sum, r) => sum + r.rating,0) / totalReviews;

        event.totalReviews = totalReviews;

        event.avgRating = avgRating.toFixed(1);

        await event.save();

        res.status(201).json({message : "Review added successfully!!",review});
    }
    catch(err){
        next(err);
    }

}
module.exports = createReview;