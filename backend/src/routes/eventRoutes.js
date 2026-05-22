const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const {authorize} = require('../middleware/roleMiddleware');
const eventController = require("../controllers/event");


router.get("/",eventController.getEvent);


//router.use(protect);


//protected route
router.post("/", protect, authorize("admin","clubHead"),eventController.createEvent);  
router.delete("/:id",protect, authorize("admin","clubHead"),eventController.deleteEvent);
router.patch("/:id",protect,authorize("admin","clubHead"),eventController.updateEvent); 




module.exports = router;
