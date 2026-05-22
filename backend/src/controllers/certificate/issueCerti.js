const certificate = require("../../models/Certificate");
const event = require("../../models/Event");
const registration = require("../../models/Registration");
const club = require("../../models/Club");

const issueCerti = async (req,res,next) => {
    try{
        const {eventId,userId,certificateUrl} = req.body;

        //check event
        const e = await event.findById(eventId);
        if (!e) {
           return res.status(404).json({ message: "Event not found" });
        }

        //check event completed
        if (new Date() < new Date(e.date)) {
      return res.status(400).json({ message: "Event not completed yet" });
    }

    const c = await club.findById(e.club);

    if (req.user.role !== "admin" && c.clubHead.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const r = await registration.findOne({
      user: userId,
      event: eventId
    });

    if (!r) {
      return res.status(400).json({ message: "User not registered" });
    }

    const certi = await certificate.create({
        user : userId,
        event : eventId,
        certificateUrl,
        issuedBy: req.user._id
    });

    res.status(201).json({
      message: "Certificate issued successfully",
      certi
    });

    }
    catch(err){
        next(err);
    }
 
}
module.exports = issueCerti;