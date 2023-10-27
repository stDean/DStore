const { NotFoundError } = require("../errors");
const Product = require("../model/product.schema");
const { StatusCodes } = require("http-status-codes");
const slugify = require("slugify");

const ProductCtrl = {
  createProduct: async (req, res) => {
    req.body.createdBy = req.user._id;
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const product = await Product.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(product);
  },
  getProducts: async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products, nbHits: products.length });
  },
  getProduct: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json(product);
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    req.body.createdBy = req.user._id;

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.status(StatusCodes.OK).json(product);
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json({ msg: "Product deleted!." });
  },
};

module.exports = ProductCtrl;
