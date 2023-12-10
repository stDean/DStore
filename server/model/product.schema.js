const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "provide a name for product"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "please provide a slug"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "description cannot be empty"],
    },
    price: {
      type: Number,
      required: [true, "price cannot be empty"],
    },
    category: {
      type: String,
      required: [true, "product category required"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      required: [true, "product brand required"],
    },
    images: {
      type: Array,
    },
    color: [{ type: mongoose.Schema.ObjectId, ref: "Color" }],
    tag: String,
    ratings: [
      {
        star: Number,
        comment: String,
        ratingBy: { type: mongoose.Types.ObjectId, ref: "User" },
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
