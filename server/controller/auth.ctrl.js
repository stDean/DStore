const User = require("../model/user.schema");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");

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
    const { firstName } = createdUser;
    res.status(StatusCodes.CREATED).json({ firstName });
  },
  login: async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "User Logged In!!" });
  },
};

module.exports = AuthCtrl;
