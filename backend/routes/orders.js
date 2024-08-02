const router = require("express").Router();
const User = require("../models/user");
const verifyJWT = require("../middleware/verifyJWT.js");
const Book = require("../models/book");
const Order = require("../models/orders");

//place order
router.post("/place-order", verifyJWT, async (req, res) => {
  try {
    const id = req.user?._id;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDatabase = await newOrder.save();
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDatabase._id },
      });
      //clear cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
      return res
        .status(200)
        .json({ message: "sucess  user cart order places" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "error while trying to update book by  user" });
  }
});
router.get("/order-history", verifyJWT, async (req, res) => {
  try {
    const id = req.user?._id;
    const user = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderdata = user.orders;
    return res.status(200).json({ orderData: orderdata, message: "suceess " });
  } catch (error) {
    return res.status(500).json({ message: "error occured" });
  }
});
router.patch("/update-status", verifyJWT, async (req, res) => {
  /*  try { */

  const { status, id } = req.body;
  console.log(status);
  const user = await User.findById(req.user?._id);
  if (user.role == "admin") {
    const orderrr = await Order.findById(id);
    orderrr.status = status;
    await orderrr.save();
    console.log(orderrr);

    const viewOrder = await Order.find({});
    return res
      .status(200)
      .json({ order: viewOrder, message: "status changed" });
  }
  return res.status(400).json({ message: "user is not authorized" });
  /*  } catch (error) {
    return res.status(500).json({ message: "error occured" });
  } */
});
router.get("/get-orders", verifyJWT, async (req, res) => {
  try {
    const order = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: order, message: "sucess" });
  } catch (error) {
    return res.status(500).json({ message: "error occured" });
  }
});
module.exports = router;
