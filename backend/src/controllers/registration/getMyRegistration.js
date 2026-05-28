const Registration = require("../../models/Registration");

const getMyRegistration = async(req,res,next) =>{
    try{
        const registrations = await Registration.find({
            user : req.user._id
        }).populate({path: "event",
            select: "title date location status",
            populate: {
                path: "club",
                select: "clubName"
            }})
            .sort({createdAt : -1});

            res.status(200).json({count : registrations.length,registrations});

    }
    catch(err){
        next(err);
    }
}
module.exports = getMyRegistration;