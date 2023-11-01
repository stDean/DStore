const express = require("express");
const router = express.Router();

const BlogCategoryCtrl = require("../controller/blog_category.ctrl");
const {
  createBlogCategory,
  getBlogCategories,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = BlogCategoryCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");
const AUTH_MIDDLEWARE = require("../middleware/auth.middleware");

router
  .route("/")
  .get(getBlogCategories)
  .post([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], createBlogCategory);
router
  .route("/:id")
  .get(getBlogCategory)
  .patch([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], updateBlogCategory)
  .delete([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], deleteBlogCategory);

module.exports = router;
