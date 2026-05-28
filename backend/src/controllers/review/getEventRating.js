const Review = require("../../models/Review");

const getEventRating = async(req,res,next) => {
    try{
        const {eventId} = req.params;

        //aggregate
        /*const stat = await review.aggregate([
            {
                $match : {
                    event: new require("mongoose").Types.ObjectId(eventId)
                }
            },
            {
                $group : {
                    _id : "$rating",
                    count : {$sum : 1}
                }
            }
        ]);*/
        const reviews =
            await Review.find({
                event: eventId,

            })
            .populate(
                "user",
                "username"
            )
            .sort({
                createdAt: -1
            });

        //distribution
        let distribution = { 1:0, 2:0, 3:0,4:0,5:0};

        let total = reviews.length;
        let sum = 0;

        reviews.forEach(review=> {
            distribution[review.rating] += 1;
            sum += review.rating;
        });

        const avg = total === 0 ? 0 : (sum/total).toFixed(2);

        res.status(200).json({
            totalReview : total,
            avgRating : avg,
            distribution,
            reviews
        });

    }
    catch(err){
        next(err);
    }

}
module.exports = getEventRating;