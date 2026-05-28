const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },

    description :{
        type : String,
         required: true,
        maxlength: 3000
    },

    category: {
        type: String,
        required: true,
        enum: [
            "Hackathon",
            "Workshop",
            "Seminar",
            "Competition",
            "Cultural",
            "Sports",
            "Webinar",
            "Bootcamp",
            "Other"
        ]
    },

     bannerImage: {
        type: String,
        default: ""
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

     mode: {
        type: String,
        enum: ["Online", "Offline"],
        default: "Offline"
    },

    club : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Club",
        required : true
    },

    attendeesCount: {
        type: Number,
        default: 0
    },

    registrationOpen: {
        type: Boolean,
        default: true
    },

     tags: [
        {
            type: String
        }
    ],

    status: {
        type: String,
        enum: [
            "Upcoming",
            "Ongoing",
            "Completed",
            "Cancelled"
        ],
        default: "Upcoming"
    },

    totalRating : {
        type : Number,
        default : 0,
    },

    avgRating : {
        type : Number,
        default : 0
    },

    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


},{timestamps : true});

eventSchema.index({ date: 1 });

eventSchema.index({ category: 1 });

eventSchema.index({ club: 1 });

eventSchema.index({
    title: "text",
    description: "text"
});

module.exports = mongoose.model("Event",eventSchema);