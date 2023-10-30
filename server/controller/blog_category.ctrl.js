const { NotFoundError } = require("../errors");
const BlogCategory = require("../model/blog_category.schema");
const { StatusCodes } = require("http-status-codes");

const BlogCategoryCtrl = {
  createBlogCategory: async (req, res) => {
    const blogCategory = await BlogCategory.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(blogCategory);
  },
  getBlogCategories: async (req, res) => {
    const blogCategory = await BlogCategory.find({});
    res.status(StatusCodes.OK).json(blogCategory);
  },
  getBlogCategory: async (req, res) => {
    const { id } = req.params;
    const blogCategory = await BlogCategory.findById(id);
    if (!blogCategory) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json(blogCategory);
  },
  updateBlogCategory: async (req, res) => {
    const { id } = req.params;
    const blogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!blogCategory) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json(blogCategory);
  },
  deleteBlogCategory: async (req, res) => {
    const { id } = req.params;
    const blogCategory = await BlogCategory.findByIdAndDelete(id);
    if (!blogCategory) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
  },
};

module.exports = BlogCategoryCtrl;
