const express = require("express");
const router = express.Router();

const ColorCtrl = require("../controller/color.ctrl");
const { createColor, getColors, getColor, updateColor, deleteColor } =
  ColorCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");
const AUTH_MIDDLEWARE = require("../middleware/auth.middleware");

router
  .route("/")
  .get(getColors)
  .post([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], createColor);
router
  .route("/:id")
  .get(getColor)
  .patch([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], updateColor)
  .delete([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], deleteColor);

module.exports = router;
