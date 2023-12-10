const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    color: { type: mongoose.Types.ObjectId, ref: "Color" },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Cart", cartSchema);
