const express = require("express");
const router = express.Router();

const ProductCtrl = require("../controller/product.ctrl");
const UploadCtrl = require("../controller/uploadCtrl");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
} = ProductCtrl;
const { uploadProductImages, deleteProductImages } = UploadCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");
const AUTH_MIDDLEWARE = require("../middleware/auth.middleware");

const {
  uploadImg,
  productImageResize,
} = require("../middleware/image-upload.middleware");

router
  .route("/")
  .get(getProducts)
  .post([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], createProduct);
router.patch("/rate", rateProduct);
router.post(
  "/upload",
  [AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE],
  uploadImg.array("images", 10),
  productImageResize,
  uploadProductImages
);
router.delete(
  "/delete-image/:id",
  [AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE],
  deleteProductImages
);
router
  .route("/:id")
  .get(getProduct)
  .patch([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], updateProduct)
  .delete([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], deleteProduct);

module.exports = router;
