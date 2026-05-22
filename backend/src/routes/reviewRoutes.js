const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const {authorize} = require('../middleware/roleMiddleware');
const reviewController = require("../controllers/review");


router.get("/:eventId",reviewController.getEventRating);


//router.use(protect);


//protected route
router.post("/:eventId", protect,reviewController.createReview);  






module.exports = router;
