const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
        required : true
    }

},{timestamps : true});

//prevent duplicate fav
favoriteSchema.index({user : 1, event : 1},{unique : true});
module.exports = mongoose.model("Favorites",favoriteSchema);