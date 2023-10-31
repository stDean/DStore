const express = require("express");
const router = express.Router();

const ProductCtrl = require("../controller/product.ctrl");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
  uploadProductImages,
} = ProductCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");

const {
  uploadImg,
  productImageResize,
} = require("../middleware/image-upload.middleware");

router.route("/").get(getProducts).post(ADMIN_MIDDLEWARE, createProduct);
router.patch("/rate", rateProduct);
router.patch(
  "/upload/:id",
  ADMIN_MIDDLEWARE,
  uploadImg.array("images", 10),
  productImageResize,
  uploadProductImages
);
router
  .route("/:id")
  .get(getProduct)
  .patch(ADMIN_MIDDLEWARE, updateProduct)
  .delete(ADMIN_MIDDLEWARE, deleteProduct);

module.exports = router;
