const User = require("../model/user.schema");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");
const generateAccessJWT = require("../utils/accesstoken");

const AuthCtrl = {
  register: async (req, res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new UnauthenticatedError(
        "A user with this email already exists, provide another email."
      );
    }

    const createdUser = await User.create({ ...req.body }).select("-password");
    res.status(StatusCodes.CREATED).json({ createdUser });
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

    res.status(StatusCodes.OK).json({ token: user.createJWT(), user });
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
    console.log(req.cookies.refreshToken);
    return res.status(StatusCodes.OK).json({ msg: "Logged out." });
  },
};

module.exports = AuthCtrl;
