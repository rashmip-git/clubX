const Event = require("../../models/Event");

const getEvent = async (req,res,next) => {
    try{
        const {club,category,status,featured,date,search,page = 1,limit =10} = req.query;

        const filter = {isActive : true};

        if(club){
            filter.club = club;
        }
        if (category) {
            filter.category = category;
        }

        if (status){
            filter.status = status;
        }
        if(featured === "true") {
            filter.isFeatured = true;
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
/*
        if(search){
            filter.title = {
                $regex : search,
                $options : "i"
            }
        }*/

            if (search) {

            filter.$text = {
                $search: search
            };

        }

        

        const skip = (page -1)*parseInt(limit);

        const events = await Event.find(filter)
            .populate("club", "clubName")
            .populate("createdBy", "username email")
            .sort({ date: 1 }) // earliest first
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Event.countDocuments(filter);
        res.status(200).json({
            total,
            page : Number(page),
            pages: Math.ceil(total / parseInt(limit)),
            count: events.length,
            events

        })

    }
    catch(err){
        next(err);
    }
}
module.exports = getEvent;