const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name."],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name."],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
    },
    mobile: {
      type: String,
      unique: true,
      required: [true, "Please provide a valid mobile number."],
    },
    password: {
      type: String,
      required: [true, "Please enter a secure password."],
      minLength: [6, "Password has to be at least 6 characters long."],
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
    },
    wishlist: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

// a pre save method to hash password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// add method to create JWT
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.firstName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

userSchema.methods.generateRefreshJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.firstName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_LIFETIME }
  );
};

//Export the model
module.exports = mongoose.model("User", userSchema);
