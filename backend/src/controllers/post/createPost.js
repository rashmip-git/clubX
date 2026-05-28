const Post = require("../../models/Post");
const Club = require("../../models/Club");

const createPost = async (req, res, next) => {
  try {
    const { clubId, caption, images, taggedEvent, isPinned} = req.body;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    // authorization
    if (
      req.user.role !== "admin" &&
      club.clubHead.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const post = await post.create({
      club: clubId,
      caption,
      images,
      taggedEvent,
      isPinned,
      createdBy: req.user._id
    });

    club.totalPosts += 1;
    await club.save();

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (err) {
    next(err);
  }
};

module.exports = createPost;