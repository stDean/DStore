const express = require("express");
const router = express.Router();
const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");

const UserCtrl = require("../controller/user.ctrl");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserRole,
  blockUser,
  unBlockUser,
  addToWishlist,
} = UserCtrl;

router.get("/user", getUser);
router.patch("/update-user", updateUser);
router.patch("/wishlist", addToWishlist);

router.get("/users", ADMIN_MIDDLEWARE, getUsers);
router.patch("/update-role/:id", ADMIN_MIDDLEWARE, updateUserRole);
router.patch("/block-user/:id", ADMIN_MIDDLEWARE, blockUser);
router.patch("/unblock-user/:id", ADMIN_MIDDLEWARE, unBlockUser);
router.delete("/delete-user/:id", ADMIN_MIDDLEWARE, deleteUser);

module.exports = router;
