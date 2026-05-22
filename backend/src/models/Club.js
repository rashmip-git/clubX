const mongoose =  require("mongoose");

const clubSchema = new mongoose.Schema({
    clubName : {
        type : String,
        required : true,
        unique : true
    },

    description : {
        type : String,
        required : true
    },

    clubHead : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

},{timestamps : true});

module.exports = mongoose.model("Club",clubSchema);