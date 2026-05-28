const Post = require("../../models/Post");
const getSinglePost = async (req,res, nex) => {
    try {
        const { id } = req.params;
        const post =
            await Post.findById(id)
            .populate(
                "club",
                "clubName logo"
            )

            .populate(
                "createdBy",
                "username profileImage"
            )

            .populate(
                "taggedEvent",
                "title"
            );

        if (!post) {

            return res.status(404).json({

                success: false,

                message: "Post not found"

            });

        }

        res.status(200).json({

            success: true,

            post

        });

    }

    catch (err) {

        next(err);

    }

};

module.exports = getSinglePost;