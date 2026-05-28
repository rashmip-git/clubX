const Certificate = require("../../models/Certificate");
const Event = require("../../models/Event");
const Registration = require("../../models/Registration");
const Club = require("../../models/Club");


const issueCerti = async (req,res,next) => {
    try{
        const {eventId,userId,certificateUrl,certificateTitle} = req.body;

        //check event
        const event = await Event.findById(eventId);
        if (!event) {
           return res.status(404).json({ message: "Event not found" });
        }

        //check event completed
        if (new Date() < new Date(event.date)) {
      return res.status(400).json({ message: "Event not completed yet" });
    }

    const club = await Club.findById(event.club);

    if (req.user.role !== "admin" && club.clubHead.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const registration = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (!registration) {
      return res.status(400).json({ message: "User not registered" });
    }

    const existingCertificate = await Certificate.findOne({
    user: userId,
    event: eventId
});

if(existingCertificate){
    return res.status(400).json({
        message: "Certificate already issued"
    });
}

    const certificate = await Certificate.create({
        user : userId,
        event : eventId,
        certificateUrl,
        certificateTitle,
        issuedBy: req.user._id
    });

    res.status(201).json({
      message: "Certificate issued successfully",
      certificate
    });

    }
    catch(err){
        next(err);
    }
 
}
module.exports = issueCerti;