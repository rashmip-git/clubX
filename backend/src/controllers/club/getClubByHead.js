const club = require("../../models/Club");

const getClubByHead = async (req,res,next) =>{
    try{
       // const {headId} = req.params;

        const c = await club.findOne({clubHead : req.user.id}).populate("clubHead","username email");

        if(!c){
            return res.status(404).json({message : "club not found"});

        }

        res.status(200).json(c);


    }
    catch(err){
        next(err);
    }

}
module.exports = getClubByHead;