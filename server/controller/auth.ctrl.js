const User = require("../model/user.schema");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");
const generateAccessJWT = require("../utils/accesstoken");
const sendMail = require("./sendMail");

const AuthCtrl = {
  register: async (req, res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new UnauthenticatedError(
        "A user with this email already exists, provide another email."
      );
    }

    const createdUser = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(createdUser);
  },
  login: async (req, res) => {
    const { email, password: enteredPassword } = req.body;
    // make sure fields are filled
    if (!email || !enteredPassword) {
      throw new BadRequestError("All fields must be filled.");
    }

    // get the user else throw an error if no user found
    let user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("No User with this email exist.");
    }

    // if user found compare the password and throw an error if password don't match
    const isCorrectPassword = await user.comparePassword(enteredPassword);
    if (!isCorrectPassword) {
      throw new UnauthenticatedError("Incorrect password entered.");
    }

    // generate refresh token
    const refreshToken = user.generateRefreshJWT();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh_token",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    res.status(StatusCodes.OK).json(user);
  },
  adminLogin: async (req, res) => {
    const { email, password: enteredPassword } = req.body;
    // make sure fields are filled
    if (!email || !enteredPassword) {
      throw new BadRequestError("All fields must be filled.");
    }

    // get the user else throw an error if no user found
    let findAdmin = await User.findOne({ email });
    if (!findAdmin || findAdmin.role !== "admin") {
      throw new UnauthenticatedError("Unauthorized access");
    }

    // if user found compare the password and throw an error if password don't match
    const isCorrectPassword = await findAdmin.comparePassword(enteredPassword);
    if (!isCorrectPassword) {
      throw new UnauthenticatedError("Incorrect password entered.");
    }

    // generate refresh token
    const refreshToken = findAdmin.generateRefreshJWT();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh_token",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    res.status(StatusCodes.OK).json(findAdmin);
  },
  getAccessToken: async (req, res) => {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token) {
      throw new UnauthenticatedError("Please login to have access.");
    }

    const user = jwt.verify(rf_token, process.env.JWT_SECRET);
    const accessToken = generateAccessJWT(user.userId);

    res.status(StatusCodes.OK).json({ accessToken });
  },
  LogOut: async (req, res) => {
    res.clearCookie("refreshToken", { path: "/api/auth/refresh_token" });
    return res.status(StatusCodes.OK).json({ msg: "Logged out." });
  },
  forgetPassword: async (req, res) => {
    const { email } = req.body;
    if (!email) {
      throw new BadRequestError("Please provide your email");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("No user with this email.");
    }

    const accessToken = generateAccessJWT(user._id);
    const url = `${process.env.CLIENT_URL}/auth/reset-password/${accessToken}`;
    sendMail(email, url, "Reset your password", "Reset password");

    res.status(StatusCodes.OK).json({ msg: "Reset Password" });
  },
  resetPassword: async (req, res) => {
    const {
      body: { password },
      user: { _id: id },
    } = req;
    if (!password || password.length < 6) {
      throw new BadRequestError("Provide a more secure password.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      id,
      { password: hashPassword },
      { new: true, runValidator: true }
    );

    res.status(StatusCodes.OK).json({ user, msg: "password updated" });
  },
};

module.exports = AuthCtrl;
