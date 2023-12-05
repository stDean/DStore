const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var enqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  mobile: {
    type: String,
    required: [true, "Mobile is required"],
  },
  comment: {
    type: String,
    required: [true, "Password is required"],
  },
  status: {
    type: String,
    default: "Submitted",
    enum: ["Submitted", "In Progress", "Contacted", "Resolved"],
  },
});

//Export the model
module.exports = mongoose.model("Enquiry", enqSchema);
