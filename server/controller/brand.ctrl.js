const Brand = require("../model/brand.schema");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const BrandCtrl = {
  createBrand: async (req, res) => {
    const brand = await Brand.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(brand);
  },
  getBrands: async (req, res) => {
    const brand = await Brand.find({});
    res.status(StatusCodes.OK).json(brand);
  },
  getBrand: async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json(brand);
  },
  updateBrand: async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!brand) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json(brand);
  },
  deleteBrand: async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      throw new NotFoundError("Product not found");
    }

    res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
  },
};

module.exports = BrandCtrl;
