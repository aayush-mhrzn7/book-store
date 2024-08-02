const router = require("express").Router();
const User = require("../models/user");
const verifyJWT = require("../middleware/verifyJWT");

router.patch("/add-cart/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user?._id);
    const isBookInCart = user.cart.includes(id);
    console.log(isBookInCart);
    if (isBookInCart) {
      await User.findByIdAndUpdate(req.user?._id, {
        $pull: { cart: id },
      });
      return res.status(200).json({ message: "already incart so removed" });
    }
    const data = await User.findByIdAndUpdate(req.user?._id, {
      $push: { cart: id },
    });

    return res.status(200).json({ data: data, message: " added cart" });
  } catch (error) {
    return res.status(500).json({ message: "error server" });
  }
});

router.get("/cart", verifyJWT, async (req, res) => {
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
