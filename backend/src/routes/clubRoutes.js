const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const {authorize} = require('../middleware/roleMiddleware');
const clubController = require("../controllers/club");


router.get("/",clubController.getClub);
router.get("/my-club",protect,clubController.getClubByHead);

//router.use(protect);


//protected route
router.post("/", protect, authorize("admin"),clubController.createClub);  

router.delete("/:id",protect, authorize("admin"),clubController.deleteClub); 




module.exports = router;
