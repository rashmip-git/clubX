const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const {authorize} = require('../middleware/roleMiddleware');
const favController = require("../controllers/favorites");


router.get("/my",protect,favController.getMyFav);


//router.use(protect);


//protected route
router.post("/:eventId", protect,favController.addTofav);  
router.delete("/:eventId",protect,favController.removeFromFav);





module.exports = router;
