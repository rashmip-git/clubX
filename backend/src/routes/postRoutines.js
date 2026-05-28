const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const {authorize} = require('../middleware/roleMiddleware');
const postController = require("../controllers/post");


router.get("/club/:clubId",postController.getClubPosts);
router.get("/",postController.getfeed);


//router.use(protect);


//protected route
router.post("/", protect,postController.createPost);
router.get("/:id", postController.getSinglePost); 
router.post("/:postId/like", protect, postController.toggleLike);
router.post("/:postId/save", protect, postController.toggleSavePost);
router.delete("/:id",protect,postController.deletePost);





module.exports = router;
