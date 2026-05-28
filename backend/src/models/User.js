const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { 
        type: String, 
        required : true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },

    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase:true,
        trim : true,
    },

    password: { 
        type: String, 
        required: true, 
        minlength: 8, 
        select: false
    },
    role : {
        type : String,
        enum : ["student","admin","clubHead"],
        default : "student",
        required : true
    },

    profileImage: {
        type: String,
        default:
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },

    /*coverImage: {
        type: String,
        default: ""
    },*/

    bio: {
        type: String,
        maxlength: 250,
        default: ""
    },

    department: {
        type: String,
        default: ""
    },

    year: {
        type: Number
    },

   /* usn: {
        type: String,
        unique: true,
        sparse: true
    },*/

    /*phoneNumber: {
        type: String,
        default: ""
    },*/

    // SOCIAL LINKS

    socialLinks: {
       /* instagram: {
            type: String,
            default: ""
        },*/

        linkedin: {
            type: String,
            default: ""
        },

        github: {
            type: String,
            default: ""
        }
    },

    // INTERESTS / SKILLS

    interests: [
        {
            type: String
        }
    ],

    skills: [
        {
            type: String
        }
    ],

    // CLUBS

    joinedClubs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Club"
        }
    ],

    // SAVED POSTS

    savedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],

    // STATS

    /*totalEventsAttended: {
        type: Number,
        default: 0
    },*/

    totalCertificates: {
        type: Number,
        default: 0
    },

    // ACCOUNT STATUS

    isVerified: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    }
  },
  { timestamps: true }
);

// ---- MUST BE BEFORE EXPORT ----
userSchema.pre("save", async function (next) {
  console.log(" inside pre hook");

  if (!this.isModified("password")) return next();

  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
  catch(err){
    throw new Error(`Password hashing failed: ${err.message}`);
  }
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// ---- EXPORT AFTER EVERYTHING ----
const User = mongoose.model("User", userSchema);
module.exports = User;

