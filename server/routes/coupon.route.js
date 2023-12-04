const express = require("express");
const router = express.Router();

const CouponCtrl = require("../controller/coupon.ctrl");
const {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} = CouponCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");

router
  .route("/")
  .post(ADMIN_MIDDLEWARE, createCoupon)
  .get(ADMIN_MIDDLEWARE, getCoupons);

router.post("/apply", applyCoupon);

router
  .route("/:id")
  .get(getCoupon)
  .patch(ADMIN_MIDDLEWARE, updateCoupon)
  .delete(ADMIN_MIDDLEWARE, deleteCoupon);

module.exports = router;
