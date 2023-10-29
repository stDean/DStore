const express = require("express");
const router = express.Router();

const BlogCtrl = require("../controller/blog.ctrl");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} = BlogCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");

router.route("/").get(getBlogs).post(ADMIN_MIDDLEWARE, createBlog);
router.patch("/like", likeBlog);
router.patch("/dislike", dislikeBlog);
router
  .route("/:id")
  .get(getBlog)
  .patch(ADMIN_MIDDLEWARE, updateBlog)
  .delete(ADMIN_MIDDLEWARE, deleteBlog);

module.exports = router;
