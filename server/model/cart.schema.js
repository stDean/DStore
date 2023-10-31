const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    userCart: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    totalAfterDiscount: Number,
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
