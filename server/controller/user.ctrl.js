const { NotFoundError } = require("../errors");
const User = require("../model/user.schema");
const { StatusCodes } = require("http-status-codes");
const FindLogic = require("../utils/checkDB");

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
    const { id } = req.params;

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
  addToWishlist: async (req, res) => {
    const {
      user: { _id: userId },
      body: { productId },
    } = req;
    const user = await User.findById(userId);
    const alreadyInWishlist = FindLogic(user.wishlist, productId);

    if (alreadyInWishlist) {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { wishlist: productId },
        },
        { new: true, runValidators: true }
      );

      res.status(StatusCodes.OK).json(user);
    } else {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { wishlist: productId },
        },
        { new: true, runValidators: true }
      );

      res.status(StatusCodes.OK).json(user);
    }
  },
  getWishlist: async (req, res) => {
    const { _id: userId } = req.user;
    const user = await User.findById(userId).populate("wishlist");
    res.status(StatusCodes.OK).json(user);
  },
  updateUserAddress: async (req, res) => {
    const {
      user: { _id: userId },
    } = req;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { address: req.body.address },
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json(updatedUser);
  },
};

module.exports = UserCtrl;
