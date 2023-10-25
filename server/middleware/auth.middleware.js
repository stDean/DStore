const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const User = require("../model/user.schema");

const AuthMiddleware = async (req, res, next) => {
  // get token from header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided..");
  }

  const token = authHeader.split(" ")[1];

  try {
    // verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // set the req.user
    req.user = await User.findById(payload?.userId);
    next();
  } catch (error) {
    throw new UnauthenticatedError(
      "Authorization Token expired, login to get new token.."
    );
  }
};

module.exports = AuthMiddleware;
