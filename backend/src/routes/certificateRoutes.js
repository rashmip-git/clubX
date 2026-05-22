const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const {authorize} = require('../middleware/roleMiddleware');
const certiController = require("../controllers/certificate");


router.get("/my",protect,certiController.getMyCertificates);
router.get("/event/:eventId",protect,authorize("admin","clubHead"),certiController.getCertificates);

//router.use(protect);


//protected route
router.post("/", protect, authorize("admin","clubHead"),certiController.issueCerti);  

//router.delete("/:id",protect, authorize("admin"),clubController.deleteClub); 




module.exports = router;
