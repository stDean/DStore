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

router
  .route("/")
  .get(getBlogCategories)
  .post(ADMIN_MIDDLEWARE, createBlogCategory);
router
  .route("/:id")
  .get(getBlogCategory)
  .patch(ADMIN_MIDDLEWARE, updateBlogCategory)
  .delete(ADMIN_MIDDLEWARE, deleteBlogCategory);

module.exports = router;
