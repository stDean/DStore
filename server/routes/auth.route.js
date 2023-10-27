const express = require("express");
const router = express.Router();

const AuthCtrl = require("../controller/auth.ctrl");
const { login, register, getAccessToken, LogOut } = AuthCtrl;

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refresh_token").post(getAccessToken);
router.route("/logout").get(LogOut);

module.exports = router;
