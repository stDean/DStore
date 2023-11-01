const { NotFoundError } = require("../errors");
const Coupon = require("../model/coupon.schema");
const Cart = require("../model/cart.schema");
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
  applyCoupon: async (req, res) => {
    const {
      body: { coupon },
      user: { _id: userId },
    } = req;
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (!validCoupon) {
      throw new NotFoundError("No coupon found");
    }

    let cart = await Cart.findOne({
      userCart: userId,
    }).populate("products.product");
    let totalAfterDiscount = (
      cart.cartTotal -
      (cart.cartTotal * validCoupon.discount) / 100
    ).toFixed(2);

    await Cart.findOneAndUpdate(
      { userCart: userId },
      { totalAfterDiscount },
      { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ msg: "Coupon Applied", totalAfterDiscount });
  },
};

module.exports = CouponCtrl;
