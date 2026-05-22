const event = require("../../models/Event");

const getEvent = async (req,res,next) => {
    try{
        const {club,date,search,page = 1,limit =10} = req.query;

        const filter = {};

        if(club){
            filter.club = club;
        }

        if(date){
            const start = new Date(date);
            const end = new Date(date);
            end.setHours(23,59,59,999);

            filter.date = {
                $gte : start,
                $lte : end
            }
        }

        if(search){
            filter.title = {
                $regex : search,
                $options : "i"
            }
        }

        

        const skip = (page -1)*parseInt(limit);

        const e = await event.find(filter)
            .populate("club", "clubName")
            .populate("createdBy", "username email")
            .sort({ date: 1 }) // earliest first
            .skip(skip)
            .limit(parseInt(limit));

        const total = await event.countDocuments(filter);
        res.status(200).json({
            total,
            page : Number(page),
            pages: Math.ceil(total / parseInt(limit)),
            count: e.length,
            e

        })

    }
    catch(err){
        next(err);
    }
}
module.exports = getEvent;