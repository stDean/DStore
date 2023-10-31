const express = require("express");
const router = express.Router();

const AUTH_MIDDLEWARE = require("../middleware/auth.middleware");
const AuthCtrl = require("../controller/auth.ctrl");
const {
  login,
  adminLogin,
  register,
  getAccessToken,
  LogOut,
  resetPassword,
  forgetPassword,
} = AuthCtrl;

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/admin-login").post(adminLogin);
router.route("/refresh_token").post(getAccessToken);
router.route("/forget-password").post(forgetPassword);

// note i am using this to both update and reset password!!
router.patch("/reset-password", AUTH_MIDDLEWARE, resetPassword);
router.route("/logout").get(LogOut);

module.exports = router;
