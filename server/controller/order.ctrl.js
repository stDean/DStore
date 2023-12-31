const Order = require("../model/order.schema");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const OrderCtrl = {
  createOrder: async (req, res) => {
    const {
      user: { _id: userId },
    } = req;

    // const userCart = await Cart.findOne({ userCart: userId });
    // let finalAmount = 0;

    // if (couponApplied && userCart.totalAfterDiscount) {
    //   finalAmount = userCart.totalAfterDiscount;
    // } else {
    //   finalAmount = userCart.cartTotal;
    // }

    // place the order
    const order = await new Order({ orderBy: userId, ...req.body }).save();

    // update the products sold and quantity fields through the userCart product id
    // const update = userCart?.products.map(item => ({
    //   updateOne: {
    //     filter: { _id: item.product._id },
    //     update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
    //   },
    // }));

    // await Product.bulkWrite(update, {});

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Order successfully created", order });
  },
  getUserOrders: async (req, res) => {
    const userOrders = await Order.find({ orderBy: req.user._id })
      .populate("orderItems.product")
      .populate("orderItems.color")
      .populate("orderBy")
      .exec();
    res.status(StatusCodes.OK).json({ userOrders, nbHits: userOrders.length });
  },
  getAllOrders: async (req, res) => {
    const allOrders = await Order.find({})
      .populate("orderItems.product")
      .populate("orderBy")
      .exec();
    res.status(StatusCodes.OK).json({ allOrders, nbHits: allOrders.length });
  },
  getSingleUsersOrderByAdmin: async (req, res) => {
    const { id: userId, orderId } = req.params;

    const allOrders = await Order.find({ orderBy: userId, _id: orderId })
      .populate("orderItems.product")
      .populate("orderItems.color")
      .populate("orderBy")
      .exec();
    res.status(StatusCodes.OK).json({ allOrders, nbHits: allOrders.length });
  },
  getUserOrder: async (req, res) => {
    const {
      user: { _id: userId },
      params: { id: orderId },
    } = req;
    const userOrder = await Order.findOne({ orderBy: userId, _id: orderId })
      .populate("orderItems.product")
      .exec();
    res.status(StatusCodes.OK).json(userOrder);
  },
  updateUserOrder: async (req, res) => {
    const {
      body: { status },
      params: { id: orderId },
    } = req;

    if (!status) {
      throw new BadRequestError("Status cannot be empty");
    }

    const updateOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true, runValidators: true }
    );
    if (!updateOrderStatus) {
      throw new NotFoundError("Order Not Found!.");
    }

    res.status(StatusCodes.OK).json(updateOrderStatus);
  },
  deleteOrder: async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      throw new NotFoundError("No coupon found");
    }

    res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
  },
  getMonthWiseOrderIncome: async (req, res) => {
    var mL = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let d = new Date();
    let endDate = "";
    d.setDate(1);

    for (let i = 0; i < 11; i++) {
      d.setMonth(d.getMonth() - 1);
      endDate = `${mL[d.getMonth()]} ${d.getFullYear()}`;
    }

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
          },
          count: { $sum: 1 },
          amount: { $sum: "$totalPriceAfterDiscount" },
        },
      },
    ]);

    res.status(StatusCodes.OK).json(data);
  },
  getYearlyTotalOrder: async (req, res) => {
    var mL = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let d = new Date();
    let endDate = "";
    d.setDate(1);

    for (let i = 0; i < 11; i++) {
      d.setMonth(d.getMonth() - 1);
      endDate = `${mL[d.getMonth()]} ${d.getFullYear()}`;
    }

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          amount: { $sum: "$totalPriceAfterDiscount" },
        },
      },
    ]);

    res.status(StatusCodes.OK).json(data);
  },
};

module.exports = OrderCtrl;
