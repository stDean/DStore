const { NotFoundError, BadRequestError } = require("../errors");
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
    // filtering
    let queryObject = { ...req.query };
    const excludeList = ["page", "limit", "sort", "fields"];
    excludeList.forEach(item => {
      delete queryObject[item];
    });

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(
      /\b(gt|gte|eq|lt|lte)\b/g,
      match => `$${match}`
    );

    let result = Product.find(JSON.parse(queryStr));

    // sorting
    if (req.query.sort) {
      // split the string then join by a space not comma
      const sortList = req.query.sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt");
    }

    // limiting the field to return in the query
    if (req.query.fields) {
      const fieldsList = req.query.fields.split(",").join(" ");
      result = result.select(fieldsList);
    }

    // Limiting and pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new BadRequestError("Page does not exist.");
      }
    }
    result = result.skip(skip).limit(limit);

    const products = await result;
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
