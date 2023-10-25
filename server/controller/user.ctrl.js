const { NotFoundError } = require("../errors");
const User = require("../model/user.schema");
const { StatusCodes } = require("http-status-codes");

const UserCtrl = {
  getUsers: async (req, res) => {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users, nbHits: users.length });
  },
  getUser: async (req, res) => {
    const { _id: id } = req.user;

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("No User with this id exist.");
    }

    res.status(StatusCodes.OK).json(user);
  },
  updateUser: async (req, res) => {
    const {
      user: { _id: id },
      body: { firstName, lastName, email, mobile },
    } = req;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        mobile,
      },
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json(updatedUser);
  },
  deleteUser: async (req, res) => {
    const { _id: id } = req.user;

    await User.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ msg: `Account deleted successfully` });
  },
  updateUserRole: async (req, res) => {
    const {
      params: { id },
      body: { role },
    } = req;

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError("No User with this id exist.");
    }

    res.status(StatusCodes.OK).json(user);
  },
  blockUser: async (req, res) => {
    const {
      params: { id },
    } = req;

    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError("No User with this id exist.");
    }

    res.status(StatusCodes.OK).json({ msg: "User Blocked." });
  },
  unBlockUser: async (req, res) => {
    const {
      params: { id },
    } = req;

    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError("No User with this id exist.");
    }

    res.status(StatusCodes.OK).json({ msg: "User Unblocked." });
  },
};

module.exports = UserCtrl;
