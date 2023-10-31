const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        color: String,
      },
    ],
    orderBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Canceled",
        "Delivered",
      ],
    },
    paymentMethod: {},
    deliveryDate: {},
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
