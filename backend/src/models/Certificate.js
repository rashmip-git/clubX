const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
    user : {
        type :  mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },

    event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  certificateTitle: {
        type: String,
        default: "Participation Certificate"
    },
    isValid: {
        type: Boolean,
        default: true
    },
  certificateUrl: {
    type: String, // stored file URL (Cloudinary/local)
    required: true
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // clubHead/admin
  }
}, { timestamps: true});

certificateSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model("Certificate", certificateSchema);