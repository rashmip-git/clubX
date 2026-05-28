const Club = require("../../models/Club");

const deleteClub = async (req,res,next) => {
    try{
        const {id} = req.params;
        const club = await Club.findById(id);

        if(!club){
            return res.status(404).json({message : "club not found"});
        }

        await club.deleteOne();
     
        res.status(200).json({
            message : "club deleted successfully"
        })
    


    } catch(err){
        next(err);
    }
}
module.exports = deleteClub;