const express = require("express");
const router = express.Router();

const OrderCtrl = require("../controller/order.ctrl");
const {
  createOrder,
  getUserOrders,
  getUserOrder,
  getAllOrders,
  updateUserOrder,
} = OrderCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");

router.route("/").get(ADMIN_MIDDLEWARE, getAllOrders);
router.route("/user").get(getUserOrders);
router.route("/cash").post(createOrder);
router.route("/:id").get(getUserOrder);
router.route("/update/:id").patch(ADMIN_MIDDLEWARE, updateUserOrder);

module.exports = router;