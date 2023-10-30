const { NotFoundError } = require("../errors");
const ProductCategory = require("../model/product_category.schema");
const { StatusCodes } = require("http-status-codes");

const ProductCategoryCtrl = {
  createProductCategory: async (req, res) => {
    const productCategory = await ProductCategory.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(productCategory);
  },
  getProductCategories: async (req, res) => {
    const productCategory = await ProductCategory.find({});
    res.status(StatusCodes.OK).json(productCategory);
  },
  getProductCategory: async (req, res) => {
    const { id } = req.params;
    const productCategory = await ProductCategory.findById(id);
    if (!productCategory) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json(productCategory);
  },
  updateProductCategory: async (req, res) => {
    const { id } = req.params;
    const productCategory = await ProductCategory.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!productCategory) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json(productCategory);
  },
  deleteProductCategory: async (req, res) => {
    const { id } = req.params;
    const productCategory = await ProductCategory.findByIdAndDelete(id);
    if (!productCategory) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
  },
};

module.exports = ProductCategoryCtrl;
