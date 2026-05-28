const Registration = require("../../models/Registration");

const getAllRegistration = async(req,res,next) => {
    try{
        const registration = await Registration.find()
        .populate("user","username email")
        .populate({
                path: "event",
                select: "title date",
                populate: {
                    path: "club",
                    select: "clubName"
                }
            });
            res.status(200).json({count : registration.length,registration});

    }
    catch(err){
        next(err);
    }
}
module.exports = getAllRegistration;