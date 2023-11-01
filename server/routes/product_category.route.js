const express = require("express");
const router = express.Router();

const ProductCategoryCtrl = require("../controller/product_category.ctrl");
const {
  createProductCategory,
  getProductCategories,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
} = ProductCategoryCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");
const AUTH_MIDDLEWARE = require("../middleware/auth.middleware");

router
  .route("/")
  .get(getProductCategories)
  .post([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], createProductCategory);
router
  .route("/:id")
  .get(getProductCategory)
  .patch([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], updateProductCategory)
  .delete([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], deleteProductCategory);

module.exports = router;
