const express = require("express");
const router = express.Router();

const BlogCtrl = require("../controller/blog.ctrl");
const UploadCtrl = require("../controller/uploadCtrl");

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadBlogImages,
} = BlogCtrl;
const { uploadProductImages, deleteProductImages } = UploadCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");
const AUTH_MIDDLEWARE = require("../middleware/auth.middleware");

const {
  uploadImg,
  blogImageResize,
} = require("../middleware/image-upload.middleware");

router
  .route("/")
  .get(getBlogs)
  .post([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], createBlog);
  
router.patch("/like", AUTH_MIDDLEWARE, likeBlog);
router.patch("/dislike", AUTH_MIDDLEWARE, dislikeBlog);
router.patch(
  "/upload-image",
  [AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE],
  uploadImg.array("images", 10),
  blogImageResize,
  uploadProductImages
);
router.delete(
  "/delete-image/:id",
  [AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE],
  deleteProductImages
);
router
  .route("/:id")
  .get(getBlog)
  .patch([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], updateBlog)
  .delete([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], deleteBlog);

module.exports = router;
