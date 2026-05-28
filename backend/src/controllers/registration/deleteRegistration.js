const Registration = require("../../models/Registration");
const Event = require("../../models/Event");

const deleteRegistration = async (req,res,next) => {
    try{
        const {id} = req.params;
        
        const registration = await Registration.findById(id);
        if(!registration){
            return res.status(404).json({message : "Registration not found!!"});
        }

        if(registration.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message : "you are not authorised to delete this registration!!"});
        }

        registration.status = "cancelled";
        await registration.deleteOne();

        
         const event = await Event.findById(registration.event);

        if (event && event.attendeesCount > 0) {
            event.attendeesCount -= 1;
            await event.save();
        }
        res.status(200).json({message:"registration cancelled successfully!!"});


    }
    catch(err){
        next(err);
    }
}
module.exports = deleteRegistration;