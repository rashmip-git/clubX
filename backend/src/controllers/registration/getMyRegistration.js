const registration = require("../../models/Registration");

const getMyRegistration = async(req,res,next) =>{
    try{
        const r = await registration.find({
            user : req.user._id
        }).populate({path: "event",
            select: "title date location",
            populate: {
                path: "club",
                select: "clubName"
            }});

            res.status(200).json({count : r.length,r});

    }
    catch(err){
        next(err);
    }
}
module.exports = getMyRegistration;