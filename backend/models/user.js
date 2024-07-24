const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=826&t=st=1721487449~exp=1721488049~hmac=60d6e120300501e2b60bf7eb2effc35e52885e96e122bd2e2851e2ca270b7faf",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favorates: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
    cart: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
