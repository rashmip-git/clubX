const Certificate = require("../../models/Certificate");

const getMyCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find({
      user: req.user._id,
      isValid : true
    })
      .populate({
        path: "event",
        select: "title date",
        populate: {
          path: "club",
          select: "clubName"
        }
      }) .sort({
                createdAt: -1
            });

    res.status(200).json({
      count: certificates.length,
      certificates
    });

  } catch (err) {
    next(err);
  }
};

module.exports = getMyCertificates;