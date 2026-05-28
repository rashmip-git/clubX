const Certificate = require("../../models/Certificate");
const Event = require("../../models/Event");
//const clubss = require("../../models/Club");

const getEventCertificates = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate("club");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // authorization
    if (
      req.user.role !== "admin" &&
      event.club.clubHead.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const certificates = await Certificate.find({ event: eventId })
      .populate("user", "username email").sort({
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

module.exports = getEventCertificates;