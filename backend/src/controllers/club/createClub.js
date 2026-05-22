const club = require("../../models/Club");
const user = require("../../models/User");

const createClub = async (req,res,next) => {
    try{
        const {clubName,description,clubHead} = req.body;

        //check if club already exists
        const existingClub = await club.findOne({clubName});
        if(existingClub){
            return res.status(400).json({message : "club already exists"});
        }

        //check if clubhead exists
        const head = await user.findById(clubHead);
        if(!head){
            return res.status(404).json({message : "club head not found"});
        }

        if(head.role != "clubHead"){
            return res.status(400).json({message:"user is not a club head"});
        }

        const c = await club.create({
            clubName,description,clubHead

        });

        res.status(201).json({message : "club created sucessfully!!",club : c});



    }
    catch(err){
        next(err);

    }
};

module.exports = createClub;