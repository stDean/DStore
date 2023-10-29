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
    image: {
      type: String,
      default:
        "https://imgs.search.brave.com/msNGfstWKoIX-7wPx6HeMg_7hvh8F-ZZA59zCwTr1-k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/OS8wNC8yMy8yOC93/b3JkcHJlc3MtOTIz/MTg4XzY0MC5qcGc",
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
