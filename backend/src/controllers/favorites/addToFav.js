const fav = require("../../models/Favorites");
const event = require("../../models/Event");

const addFavorite = async (req,res,next) => {
    try{
        const {eventId} = req.params;

        const e = await event.findById(eventId);
        if(!e){
            return res.status(404).json({message : "event not found"});
        }

        const existing = await fav.findOne({
    user: req.user._id,
    event: eventId
});

if(existing){
    return res.status(400).json({
        message: "Already in favorites"
    });
}

        const f = await fav.create({
            user : req.user._id,
            event : eventId
        });
        res.status(201).json({message : "Added to Favorites!!"});

    }
    catch(err){
        next(err);
    }

}
module.exports = addFavorite;