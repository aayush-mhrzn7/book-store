const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(400).json({ message: "invalid  token" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "invalid  user token id" });
    }
    req.user = user;
    next();
  } catch (error) {
    next();
    return res
      .status(500)
      .json({ message: "error processing the token request" });
  }
};

module.exports = verifyJWT;
