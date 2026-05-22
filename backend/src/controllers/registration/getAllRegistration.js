const registration = require("../../models/Registration");

const getAllRegistration = async(req,res,next) => {
    try{
        const r = await registration.find()
        .populate("user","username email")
        .populate({
                path: "event",
                select: "title date",
                populate: {
                    path: "club",
                    select: "clubName"
                }
            });
            res.status(200).json({count : r.length,r});

    }
    catch(err){
        next(err);
    }
}
module.exports = getAllRegistration;