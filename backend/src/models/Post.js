const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },
  caption: {
    type: String,
    maxlength: 2000,
    trim: true
  },
  images: [
    {
      type: String // URLs
    }
  ],
  taggedEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    likesCount: {
        type: Number,
        default: 0
    },
  commentsCount : {
    type : Number,
    default :0
  },
  sharesCount: {
        type: Number,
        default: 0
    },
    isPinned: {
        type: Boolean,
        default: false
    },

    savesCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// for feed optimization
postSchema.index({ createdAt: -1 });
postSchema.index({ club: 1, createdAt: -1 });
postSchema.index({ caption : "text"});

module.exports = mongoose.model("Post", postSchema);