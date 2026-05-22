const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const {authorize} = require('../middleware/roleMiddleware');
const registrationController = require("../controllers/registration");

router.post("/", protect,registrationController.createRegister);
router.get("/my", protect, registrationController.getMyRegistration);
router.get("/", protect, authorize("admin"), registrationController.getAllRegistration);
router.get("/event/:eventId", protect, registrationController.getEventRegistration);
router.get("/club/:clubId", protect, registrationController.getClubRegistration);

//router.use(protect);


//protected route
  
router.delete("/:id",protect,registrationController.deleteRegistration);



module.exports = router;
