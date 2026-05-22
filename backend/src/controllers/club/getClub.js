const club = require("../../models/Club");

const getClub = async (req,res,next) => {
    try{
        const c = await club.find().populate("clubHead","username email");
        res.status(200).json({count : c.length,
            club : c
        });

    }
    catch(err){
        next(err);
    }

};

module.exports = getClub;