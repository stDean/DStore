const express = require("express");
const router = express.Router();

const AuthCtrl = require("../controller/auth.ctrl");
const { login, register } = AuthCtrl;

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
