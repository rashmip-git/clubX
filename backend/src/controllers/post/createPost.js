const post = require("../../models/Post");
const club = require("../../models/Club");

const createPost = async (req, res, next) => {
  try {
    const { clubId, caption, images } = req.body;

    const c = await club.findById(clubId);
    if (!c) {
      return res.status(404).json({ message: "Club not found" });
    }

    // authorization
    if (
      req.user.role !== "admin" &&
      c.clubHead.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const p = await post.create({
      club: clubId,
      caption,
      images,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Post created successfully",
      p
    });

  } catch (err) {
    next(err);
  }
};

module.exports = createPost;