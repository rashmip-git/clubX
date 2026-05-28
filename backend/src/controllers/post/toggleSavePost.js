const User = require("../../models/User");
const Post = require("../../models/Post");

const toggleSavePost = async (req,res,next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }

        const user = await User.findById(req.user._id);
        const alreadySaved = user.savedPosts.includes(postId);
            
        if (alreadySaved) {
            user.savedPosts =user.savedPosts.filter( id =>id.toString() !== postId);
            post.savesCount =Math.max( 0,post.savesCount - 1);
            await user.save();
            await post.save();

            return res.status(200).json({ message: "Post unsaved",saved: false,savesCount: post.savesCount});
        }

        user.savedPosts.push(postId);
        post.savesCount += 1;
        await user.save();
        await post.save();

        res.status(200).json({
            message: "Post saved",
            saved: true,
            savesCount: post.savesCount
        });

    }

    catch (err) {
        next(err);
    }

};

module.exports = toggleSavePost;