const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const {authorize} = require('../middleware/roleMiddleware');
const postController = require("../controllers/post");


router.get("/club/:clubId",protect,postController.getClubPosts);
router.get("/",postController.getfeed);


//router.use(protect);


//protected route
router.post("/", protect,postController.createPost);  
router.delete("/:id",protect,postController.deletePost);





module.exports = router;
