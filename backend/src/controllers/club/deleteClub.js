const club = require("../../models/Club");

const deleteClub = async (req,res,next) => {
    try{
        const {id} = req.params;
        const c = await club.findById(id);

        if(!c){
            return res.status(404).json({message : "club not found"});
        }

        await c.deleteOne();
     
        res.status(200).json({
            message : "club deleted successfully"
        })
    


    } catch(err){
        next(err);
    }
}
module.exports = deleteClub;