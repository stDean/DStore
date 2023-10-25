const express = require("express");
const router = express.Router();
const AdminMiddleware = require("../middleware/admin.middleware");

const UserCtrl = require("../controller/user.ctrl");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserRole,
  blockUser,
  unBlockUser,
} = UserCtrl;

router.get("/user", getUser);
router.patch("/update-user", updateUser);

router.get("/users", AdminMiddleware, getUsers);
router.patch("/update-role/:id", AdminMiddleware, updateUserRole);
router.patch("/block-user/:id", AdminMiddleware, blockUser);
router.patch("/unblock-user/:id", AdminMiddleware, unBlockUser);
router.delete("/delete-user", AdminMiddleware, deleteUser);

module.exports = router;
