const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String,
        required : true,
        trim : true,
        maxlength : 500
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
        default: null
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

    isEdited: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }


},{timestamps:true});
commentSchema.index({post : 1,createdAt : -1});
module.exports = mongoose.model("Comments",commentSchema);