const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/auth");
const userController = require("../controllers/user");

router.get( "/me",protect,userController.getMyProfile);
router.patch("/me",protect,userController.updateProfile);
module.exports = router;