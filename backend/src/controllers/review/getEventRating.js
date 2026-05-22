const review = require("../../models/Review");

const getEventRating = async(req,res,next) => {
    try{
        const {eventId} = req.params;

        //aggregate
        const stat = await review.aggregate([
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
        ]);

        //distribution
        let distribution = { 1:0, 2:0, 3:0,4:0,5:0};

        let total = 0;
        let sum = 0;

        stat.forEach(s=> {
            distribution[s._id] = s.count;
            total += s.count;
            sum += s._id*s.count;
        });

        const avg = total === 0? 0 : (sum/total).toFixed(2);

        res.status(200).json({
            totalReview : total,
            avgRating : avg,
            distribution
        });

    }
    catch(err){
        next(err);
    }

}
module.exports = getEventRating;