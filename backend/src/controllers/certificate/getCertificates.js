const certificate = require("../../models/Certificate");
const event = require("../../models/Event");
const clubss = require("../../models/Club");

const getEventCertificates = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const e = await event.findById(eventId).populate("club");
    if (!e) {
      return res.status(404).json({ message: "Event not found" });
    }

    // authorization
    if (
      req.user.role !== "admin" &&
      e.club.clubHead.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const c = await certificate.find({ event: eventId })
      .populate("user", "username email");

    res.status(200).json({
      count: c.length,
      c
    });

  } catch (err) {
    next(err);
  }
};

module.exports = getEventCertificates;