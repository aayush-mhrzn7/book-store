const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyJWT = async (req, res, next) => {
  try {
    console.log("lolo", req.cookies);
    const token =
      req.cookies?.acessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({ message: "failed to authorize request" });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      return res.status(400).json({ message: "failed to delete" });
    }
    //adingn nwe method o req
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: "failed to delete" });
  }
};
module.exports = verifyJWT;
