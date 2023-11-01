const express = require("express");
const router = express.Router();

const EnquiryCtrl = require("../controller/enquiry.ctrl");
const {
  createEnquiry,
  getEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
} = EnquiryCtrl;

const ADMIN_MIDDLEWARE = require("../middleware/admin.middleware");
const AUTH_MIDDLEWARE = require("../middleware/auth.middleware");

router.route("/").get(getEnquiries).post(createEnquiry);
router
  .route("/:id")
  .get(getEnquiry)
  .patch([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], updateEnquiry)
  .delete([AUTH_MIDDLEWARE, ADMIN_MIDDLEWARE], deleteEnquiry);

module.exports = router;
