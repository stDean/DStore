const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "provide a title for blog"],
    },
    desc: {
      type: String,
      required: [true, "add a description for blog"],
    },
    category: {
      type: String,
      required: true,
    },
    NumOfViews: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    images: {
      type: Array,
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
