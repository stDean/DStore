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

router
  .route("/")
  .get(ADMIN_MIDDLEWARE, getProductCategories)
  .post(ADMIN_MIDDLEWARE, createProductCategory);
router
  .route("/:id")
  .get(ADMIN_MIDDLEWARE, getProductCategory)
  .patch(ADMIN_MIDDLEWARE, updateProductCategory)
  .delete(ADMIN_MIDDLEWARE, deleteProductCategory);

module.exports = router;
