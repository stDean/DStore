const express = require("express");
const router = express.Router();

const CartCtrl = require("../controller/cart.ctrl");
const { addToCart, getUserCart, emptyCart } = CartCtrl;

router.route("/").post(addToCart).get(getUserCart);
router.delete("/empty", emptyCart);

module.exports = router;
