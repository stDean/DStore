const jwt = require("jsonwebtoken");

const generateAccessJWT =  id => {
  return jwt.sign(
    { userId: id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_LIFETIME }
  );
};

module.exports = generateAccessJWT