const User = require("../model/user.schema");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");

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
    const token = createdUser.createJWT();

    res.status(StatusCodes.CREATED).json({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      mobile: createdUser.mobile,
      email: createdUser.email,
      role: createdUser.role,
      token,
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    // make sure fields are filled
    if (!email || !password) {
      throw new BadRequestError("All fields must be filled.");
    }

    // get the user else throw an error if no user found
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("No User with this email exist.");
    }

    // if user found compare the password and throw an error if password don't match
    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
      throw new UnauthenticatedError("Incorrect password entered.");
    }

    // create Jwt
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      role: user.role,
      token,
    });
  },
};

module.exports = AuthCtrl;
