const express = require("express");
const router = express.Router();

const BrandCtrl = require("../controller/brand.ctrl");
const { createBrand, getBrands, getBrand, updateBrand, deleteBrand } =
  BrandCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");
const AUTH_MIDDLEWARE = require("../middleware/auth.middleware");

router
  .route("/")
  .get(getBrands)
  .post([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], createBrand);
router
  .route("/:id")
  .get(getBrand)
  .patch([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], updateBrand)
  .delete([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], deleteBrand);

module.exports = router;
