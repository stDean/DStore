const { NotFoundError } = require("../errors");
const Blog = require("../model/blog.schema");
const User = require("../model/user.schema");
const { StatusCodes } = require("http-status-codes");
const FindLogic = require("../utils/checkDB");

const BlogCtrl = {
  createBlog: async (req, res) => {
    const blog = await Blog.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ status: "success", blog });
  },
  getBlogs: async (req, res) => {
    const blogs = await Blog.find({});
    res
      .status(StatusCodes.OK)
      .json({ status: "success", blogs, nbHits: blogs.length });
  },
  getBlog: async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id)
      .populate("likedBy")
      .populate("dislikedBy");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { NumOfViews: 1 },
      },
      { new: true, runValidators: true }
    );
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    res.status(StatusCodes.OK).json({ status: "success", blog, updateViews });
  },
  updateBlog: async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    res.status(StatusCodes.OK).json({ status: "Blog updated", blog });
  },
  deleteBlog: async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    res.status(StatusCodes.OK).json({ msg: "Blog deleted" });
  },
  likeBlog: async (req, res) => {
    const {
      body: { blogId },
      user: { _id: loggedInUserId },
    } = req;

    // get the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    // check disliked by and liked by arrays
    const alreadyLiked = FindLogic(blog.likedBy, loggedInUserId);
    const alreadyDisliked = FindLogic(blog.dislikedBy, loggedInUserId);

    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likedBy: loggedInUserId },
        },
        { new: true, runValidators: true }
      );

      return res.status(StatusCodes.OK).json(blog);
    } else if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikedBy: loggedInUserId },
        },
        { new: true, runValidators: true }
      );

      return res.status(StatusCodes.OK).json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likedBy: loggedInUserId },
        },
        { new: true, runValidators: true }
      );

      return res.status(StatusCodes.OK).json(blog);
    }
  },
  dislikeBlog: async (req, res) => {
    const {
      body: { blogId },
      user: { _id: loggedInUserId },
    } = req;

    // get the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    const alreadyLiked = FindLogic(blog.likedBy, loggedInUserId);
    const alreadyDisliked = FindLogic(blog.dislikedBy, loggedInUserId);

    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likedBy: loggedInUserId },
        },
        { new: true, runValidators: true }
      );

      return res.status(StatusCodes.OK).json(blog);
    } else if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikedBy: loggedInUserId },
        },
        { new: true, runValidators: true }
      );
      console.log("removed from disliked");

      return res.status(StatusCodes.OK).json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikedBy: loggedInUserId },
        },
        { new: true, runValidators: true }
      );
      console.log("added from liked");

      return res.status(StatusCodes.OK).json(blog);
    }
  },
};

module.exports = BlogCtrl;
