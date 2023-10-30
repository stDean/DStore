const express = require("express");
const router = express.Router();

const BrandCtrl = require("../controller/brand.ctrl");
const { createBrand, getBrands, getBrand, updateBrand, deleteBrand } =
  BrandCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");

router.route("/").get(getBrands).post(ADMIN_MIDDLEWARE, createBrand);
router
  .route("/:id")
  .get(getBrand)
  .patch(ADMIN_MIDDLEWARE, updateBrand)
  .delete(ADMIN_MIDDLEWARE, deleteBrand);

module.exports = router;
