const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    description :{
        type : String
    },

    date : {
        type : Date,
        required : true
    },

    registrationDeadline : {
        type: Date,
        required: true
},

    location : {
        type : String,
        required : true
    },

    club : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Club",
        required : true
    },

    totalRating : {
        type : Number
    },

    avgRating : {
        type : Number
    },

    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


},{timestamps : true});

module.exports = mongoose.model("Event",eventSchema);