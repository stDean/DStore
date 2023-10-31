const Cart = require("../model/cart.schema");
const User = require("../model/user.schema");
const Product = require("../model/product.schema");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const CartCtrl = {
  addToCart: async (req, res) => {
    const {
      body: { cart },
      user: { _id: userId },
    } = req;

    const user = await User.findById(userId);
    const alreadyInCart = await Cart.findOne({ userCart: user._id });
    if (alreadyInCart) {
      alreadyInCart.deleteOne();
      return res.status(StatusCodes.OK).json({ msg: "Cart item removed" });
    }

    let products = [];
    for (let i = 0; i < cart.length; i++) {
      let obj = {};
      obj.product = cart[i]._id;
      obj.quantity = cart[i].quantity;

      let getPrice = await Product.findById(cart[i]._id)
        .select("price color")
        .exec();
      obj.color = getPrice.color;
      obj.price = getPrice.price;

      products.push(obj);
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].quantity;
    }

    // console.log({ products, cartTotal, user: user._id });
    const newCart = await new Cart({
      products,
      cartTotal,
      userCart: user._id,
    }).save();
    res.status(StatusCodes.CREATED).json(newCart);
  },
  getUserCart: async (req, res) => {
    const {
      user: { _id: userId },
    } = req;

    const cart = await Cart.findOne({ userCart: userId }).populate(
      "products.product"
    );
    if (!cart) {
      throw new NotFoundError("No Item in cart");
    }

    res.status(StatusCodes.OK).json(cart);
  },
  emptyCart: async (req, res) => {
    const {
      user: { _id: userId },
    } = req;

    const cart = await Cart.findOneAndRemove({ userCart: userId });
    res.status(StatusCodes.OK).json({ msg: "Cart Cleared" });
  },
};

module.exports = CartCtrl;
