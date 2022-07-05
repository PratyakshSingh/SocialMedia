const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const postControlller = require("./../controllers/postController");
const router = express.Router();

router.route("/post/upload").post(isAuthenticated, postControlller.createPost);

router
  .route("/post/:id")
  .get(isAuthenticated, postControlller.likeandUnlikePost)
  .put(isAuthenticated, postControlller.updateCaption)
  .delete(isAuthenticated, postControlller.deletePost);

router.route("/posts").get(isAuthenticated, postControlller.getPostofFollowing);

router
  .route("/post/comment/:id")
  .put(isAuthenticated, postControlller.commentOnPost)
  .delete(isAuthenticated, postControlller.deleteComment);

module.exports = router;
