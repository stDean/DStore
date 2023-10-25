const { UnauthenticatedError } = require("../errors");

const AdminMiddleware = (req, res, next) => {
  // get the user from req.user
  const { role } = req.user;

  // check if role is 'admin'
  if (role !== "admin") {
    throw new UnauthenticatedError("Admin resources access denied.");
  }

  next();
};

module.exports = AdminMiddleware;
