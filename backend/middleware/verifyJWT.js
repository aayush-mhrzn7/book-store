const jwt = require("jsonwebtoken");
const User = require("../models/user");
const VerifyJWT = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(400).json({ message: "failed to retirve token" });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(400).json({ message: "failed to retirve decodedToken" });
  }
  const user = await User.findById(decodedToken._id);
  if (!user) {
    return res.status(400).json({ message: "failed to retirve user" });
  }
  req.user = user;
  next();
};
module.exports = VerifyJWT;
