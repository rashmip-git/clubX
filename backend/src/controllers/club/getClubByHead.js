const Club = require("../../models/Club");

const getClubByHead = async (req,res,next) =>{
    try{
       // const {headId} = req.params;

        const club = await Club.findOne({clubHead : req.user.id}).populate("clubHead","username email");

        if(!club){
            return res.status(404).json({message : "club not found"});

        }

        res.status(200).json(club);


    }
    catch(err){
        next(err);
    }

}
module.exports = getClubByHead;