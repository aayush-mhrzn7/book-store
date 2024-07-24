const router = require("express").Router();
const User = require("../models/user");
const verifyJWT = require("./userAuth");

module.exports = router;
router.patch("add-to-cart/:bookId", verifyJWT, async (req, res) => {
  try {
    const { bookId } = req.params;
    const user = await User.findById(req.user?._id);
    const isBookInCart = user.orders.includes(bookId);
    if (isBookInCart) {
      return res.status(200).json({ message: "already like" });
    }
    await User.findByIdAndUpdate(req.user?._id, {
      $push: { cart: bookId },
    });
    return res.status(200).json({ message: " added cart" });
  } catch (error) {
    return res.status(500).json({ message: "error server" });
  }
});
router.delete("add-to-cart/:bookId", verifyJWT, async (req, res) => {
  try {
    const { bookId } = req.params;
    const user = await User.findById(req.user?._id);
    const isBookInCart = user.orders.includes(bookId);
    if (isBookInCart) {
      await User.findByIdAndUpdate(req.user?._id, {
        $pop: { cart: bookId },
      });
    }
    return res.status(200).json({ message: " removed cart" });
  } catch (error) {
    return res.status(500).json({ message: "error server" });
  }
});
router.get("/cart", async (req, res) => {
  try {
    const id = req.user?._id;
    if (!id) {
      return res.status(500).json({ message: "error no id exits " });
    }
    const user = await User.findById(id).populate("cart");
    const userCart = user.cart;
    return res
      .status(200)
      .json({ cart: userCart, message: "sent cart server" });
  } catch (error) {
    return res.status(500).json({ message: "error server" });
  }
});

module.exports = router;
