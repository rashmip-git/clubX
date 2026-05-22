const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const {authorize} = require('../middleware/roleMiddleware');
const commentController = require("../controllers/comment");


router.get("/:postId",commentController.getPostComments);
//router.use(protect);


//protected route
router.post("/:postId", protect,commentController.createComment);  

router.delete("/:id",protect,commentController.deleteComment); 




module.exports = router;
