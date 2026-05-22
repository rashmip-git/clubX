const fav = require("../../models/Favorites");

const removeFav = async (req,res,next) =>{
    try{
        const {eventId} = req.params;

        const f = await fav.findOneAndDelete({
            user : req.user._id,
            event : eventId
        });

        if(!f){
            return res.status(404).json({message : "favorite not found"});
        }
         
        res.status(200).json({message : "Removed from favorite"});

    }
    catch(err){
        next(err);
    }

}
 module.exports = removeFav;