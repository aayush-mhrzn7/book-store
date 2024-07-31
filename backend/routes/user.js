const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../middleware/verifyJWT");
const bcrypt = require("bcrypt");
//sign up
router.post("/signup", async (req, res) => {
  const { username, email, password, address, role } = req.body;

  if (
    [username, email, password, address].some((field) => field.trim() == "")
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }
  const usernameExists = await User.find({ username });
  try {
    if (!usernameExists) {
      return res.status(400).json({ message: "the user already exists " });
    }
    const emailValid = await User.find({ email });
    if (!emailValid) {
      return res.status(400).json({ message: "the email already exists " });
    }
    const hashed = bcrypt.hashSync(password, 12);
    const user = await User.create({
      username: username,
      password: hashed,
      email: email,
      address: address,
      role: role,
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "there is failure in creating user " });
    }
    return res
      .status(200)
      .json({ data: user, message: "the user has been created" });
  } catch (error) {
    return res.status(400).json("failed to create a user");
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ messgae: "the email error when logging in " });
    }

    const passwordCheck = bcrypt.compareSync(password, existingUser.password);

    if (!passwordCheck) {
      return res.status(400).json({
        message:
          "the password that you have kept doesnt match the old password",
      });
    }
    const token = jwt.sign(
      {
        _id: existingUser._id,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(200)
      .json({
        cookie: token,
        user: existingUser,
        message: "the user has sucessfully logged in ",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ messgae: "server error when logging in password" });
  }
});
//get user information
router.get("/get-user", verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);

    return res.status(200).json({ data: user, message: "sucess" });
  } catch (error) {
    return res.status(500).json({ message: "error while getting user" });
  }
});
router.patch("/update-address", verifyJWT, async (req, res) => {
  try {
    const { address } = req.body;
    console.log(address);
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          address: address,
        },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ data: user, message: "address changed sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: "error " });
  }
});
router.patch("/logout", verifyJWT, async (req, res) => {
  try {
    return res.clearCookie("token").json({ message: "logged out" });
  } catch (error) {
    return res.status(500).json({ message: "error " });
  }
});
module.exports = router;
