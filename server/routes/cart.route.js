const express = require("express");
const router = express.Router();

const CartCtrl = require("../controller/cart.ctrl");
const {
  addToCart,
  getUserCart,
  emptyCart,
  removeCartItem,
  updateProductQuantity,
} = CartCtrl;

router.route("/").post(addToCart).get(getUserCart);
router.delete("/empty", emptyCart).delete("/remove/:cartId", removeCartItem);
router.patch("/updateQty/:cartId", updateProductQuantity);

module.exports = router;
