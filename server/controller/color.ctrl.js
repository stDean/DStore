const Color = require("../model/color.schema");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const ColorCtrl = {
  createColor: async (req, res) => {
    const color = await Color.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(color);
  },
  getColors: async (req, res) => {
    const color = await Color.find({});
    res.status(StatusCodes.OK).json(color);
  },
  getColor: async (req, res) => {
    const { id } = req.params;
    const color = await Color.findById(id);
    if (!color) {
      throw new NotFoundError("Color not found");
    }

    res.status(StatusCodes.OK).json(color);
  },
  updateColor: async (req, res) => {
    const { id } = req.params;
    const color = await Color.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!color) {
      throw new NotFoundError("Color not found");
    }

    res.status(StatusCodes.OK).json(color);
  },
  deleteColor: async (req, res) => {
    const { id } = req.params;
    const color = await Color.findByIdAndDelete(id);
    if (!color) {
      throw new NotFoundError("Color not found");
    }

    res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
  },
};

module.exports = ColorCtrl;
