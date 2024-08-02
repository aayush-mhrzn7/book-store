const express = require("express");
const { connectDB } = require("./connect/connectDB");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
//middilewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://book-store-front-g4rv.onrender.com",
    credentials: true,
  })
);
//routes
const User = require("./routes/user");
const Book = require("./routes/book");
const Favorate = require("./routes/favorate");
const Cart = require("./routes/cart");
const Order = require("./routes/orders");
app.use("/api/v1", User);
app.use("/api/v1", Book);
app.use("/api/v1", Favorate);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
connectDB();
app.listen(process.env.PORT || 8000, () => {
  console.log("the server is lisetning in port 8000");
});
