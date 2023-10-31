const { NotFoundError } = require("../errors");
const Coupon = require("../model/coupon.schema");
const { StatusCodes } = require("http-status-codes");

const CouponCtrl = {
  createCoupon: async (req, res) => {
    const coupon = await Coupon.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(coupon);
  },
  getCoupons: async (req, res) => {
    const coupon = await Coupon.find({});
    res.status(StatusCodes.OK).json(coupon);
  },
  getCoupon: async (req, res) => {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      throw new NotFoundError("No coupon found");
    }

    res.status(StatusCodes.OK).json(coupon);
  },
  updateCoupon: async (req, res) => {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!coupon) {
      throw new NotFoundError("No coupon found");
    }

    res.status(StatusCodes.OK).json(coupon);
  },
  deleteCoupon: async (req, res) => {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      throw new NotFoundError("No coupon found");
    }

    res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
  },
};

module.exports = CouponCtrl;
