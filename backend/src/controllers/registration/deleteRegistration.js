const registration = require("../../models/Registration");

const deleteRegistration = async (req,res,next) => {
    try{
        const {id} = req.params;
        
        const r = await registration.findById(id);
        if(!r){
            return res.status(404).json({message : "Registration not found!!"});
        }

        if(r.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message : "you are not authorised to delete this registration!!"});
        }

        await r.deleteOne();
        res.status(200).json({message:"registration cancelled successfully!!"});


    }
    catch(err){
        next(err);
    }
}
module.exports = deleteRegistration;