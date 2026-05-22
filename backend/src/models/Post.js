const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },
  caption: {
    type: String
  },
  images: [
    {
      type: String // URLs
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  commentsCount : {
    type : Number,
    default :0
  }
}, { timestamps: true });

// for feed optimization
postSchema.index({ createdAt: -1 });
postSchema.index({ club: 1, createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);