const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title cannot be empty"],
      unique: [true, "category already exists"],
      index: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("BlogCategory", blogCategorySchema);
