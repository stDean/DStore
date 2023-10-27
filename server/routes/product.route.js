const express = require("express");
const router = express.Router();

const ProductCtrl = require("../controller/product.ctrl");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } =
  ProductCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");

router.route("/").get(getProducts).post(ADMIN_MIDDLEWARE, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(ADMIN_MIDDLEWARE, updateProduct)
  .delete(ADMIN_MIDDLEWARE, deleteProduct);

module.exports = router;
