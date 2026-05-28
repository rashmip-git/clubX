const Club = require("../../models/Club");
const User = require("../../models/User");

const createClub = async (req,res,next) => {
    try{
        const {clubName,description, category,
            clubHead,
            logo,
            tags,
            socialLinks,
            contactEmail} = req.body;

        //check if club already exists
        const existingClub = await Club.findOne({clubName});
        if(existingClub){
            return res.status(400).json({message : "club already exists"});
        }

        //check if clubhead exists
        const head = await User.findById(clubHead);
        if(!head){
            return res.status(404).json({message : "club head not found"});
        }

        if(head.role != "clubHead"){
            return res.status(400).json({message:"user is not a club head"});
        }

        const club = await Club.create({
            clubName,description,category,
            clubHead,
            logo,
            tags,
            socialLinks,
            contactEmail,
        });

        await User.findByIdAndUpdate(clubHead,{$push : {joinedClubs : club._id}});

        res.status(201).json({message : "club created sucessfully!!",club});

    }
    catch(err){
        next(err);

    }
};

module.exports = createClub;