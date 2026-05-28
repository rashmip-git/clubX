const mongoose =  require("mongoose");

const clubSchema = new mongoose.Schema({
    clubName : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },

    description : {
        type : String,
        required : true,
        maxlength : 1000,
    },
    
    category : {
        type : String,
        required : true,
        enum : [
            "Technical",
            "Cultural",
            "Fashion",
            "Hardware",
            "Mech",
            "Entrepreneurship",
            "Dance",
            "Aviation",
            "Photographic",
            "Social",
            "Environmental",
            "Placement",
            "Singing",
            "Chemistry",
            "Adventure",
        ]
    },

    totalEvents: {
        type: Number,
        default: 0
    },

    clubHead : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    logo: {
        type: String,
        default: ""
    },

    socialLinks: {
        instagram: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        }, 
    },

    contactEmail: {
        type: String,
        default: ""
    },

    tags: [
        {
            type: String
        }
    ],

    totalPosts: {
        type: Number,
        default: 0
    },

    avgRating: {
        type: Number,
        default: 0
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    }


},{timestamps : true});

clubSchema.index({category : 1});
clubSchema.index({clubName : "text", description : "text"});

module.exports = mongoose.model("Club",clubSchema);