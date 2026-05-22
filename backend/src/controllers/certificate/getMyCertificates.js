const certificate = require("../../models/Certificate");

const getMyCertificates = async (req, res, next) => {
  try {
    const c = await certificate.find({
      user: req.user._id
    })
      .populate({
        path: "event",
        select: "title date",
        populate: {
          path: "club",
          select: "clubName"
        }
      });

    res.status(200).json({
      count: c.length,
      c
    });

  } catch (err) {
    next(err);
  }
};

module.exports = getMyCertificates;