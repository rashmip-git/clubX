const Club = require("../../models/Club");

const getClub = async (req,res,next) => {
    try{
        const {category,search,featured} = req.query;
        const filter = {isActive : true};
        if(category){
            filter.category = category;
        }
        if(featured === "true"){
            filter.isFeatured = true;
        }
        if(search){
            filter.$text = {$search : search};
        }


        const clubs = await Club.find(filter).populate("clubHead","username email");
        res.status(200).json({count : clubs.length,clubs
        });

    }
    catch(err){
        next(err);
    }

};

module.exports = getClub;