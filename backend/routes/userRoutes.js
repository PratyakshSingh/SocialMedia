const express = require("express");
const userControlller = require("./../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(userControlller.register);
router.route("/login").post(userControlller.login);

router.route("/logout").get(userControlller.logout);

router.route("/follow/:id").get(isAuthenticated, userControlller.followUser);

router
  .route("/update/password")
  .put(isAuthenticated, userControlller.updatePassword);

router
  .route("/update/profile")
  .put(isAuthenticated, userControlller.updateProfile);

router
  .route("/delete/me")
  .delete(isAuthenticated, userControlller.deleteMyProfile);

router.route("/me").get(isAuthenticated, userControlller.myProfile);

router.route("/my/posts").get(isAuthenticated, userControlller.getMyPosts);

router.route("/userposts/:id").get(isAuthenticated, userControlller.getUserPosts);

router.route("/user/:id").get(isAuthenticated, userControlller.getUserProfile);

router.route("/users").get(isAuthenticated, userControlller.getAllUsers);

router.route("/forgot/password").post(userControlller.forgotPassword);

router.route("/password/reset/:token").put(userControlller.resetPassword);
module.exports = router;
