const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title cannot be empty"],
      unique: [true, "product category already exists"],
      index: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("ProductCategory", productCategorySchema);
