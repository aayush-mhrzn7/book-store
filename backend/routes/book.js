const router = require("express").Router();
const User = require("../models/user");
const verifyJWT = require("./userAuth");
const Book = require("../models/book");
//add book
router.post("/add-book", verifyJWT, async (req, res) => {
  try {
    const id = req.user?._id;
    const { title, author, description, language, price, url } = req.body;
    const user = await User.findById(id);

    if (user.role !== "admin") {
      res.status(401).json({ message: "you are not authorized" });
    }

    if (
      [title, author, description, language, price, url].some(
        (field) => field.trim() == ""
      )
    ) {
      return res.status(401).json({ message: "all the fields must be filled" });
    }
    const book = await Book.create({
      title,
      author,
      description,
      language,
      price,
      url,
    });
    if (!book) {
      return res
        .status(401)
        .json({ data: book, message: "error while getting user" });
    }
    res.status(200).json({ message: "book has been added" });
  } catch (error) {
    res.status(401).json({ message: "error while getting user" });
  }
});
router.patch("/update-book/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.user?._id;
    const user = await User.findById({ userID });

    if (user.role !== "admin") {
      res.status(401).json({ message: "you are not authorized" });
    }
    const { title, author, description, language, price, url } = req.body;
    if (
      [title, author, description, language, price, url].some(
        (field) => field.trim() == ""
      )
    ) {
      return res.status(401).json({ message: "all the fields must be filled" });
    }
    const book = await Book.findByIdAndUpdate(id, {
      title,
      author,
      description,
      language,
      price,
      url,
    });
    if (!book) {
      return res.status(401).json({ message: "error while updating book" });
    }
    return res.status(200).json({ message: "book has been updated" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "error while trying to update book by  user" });
  }
});
router.delete("/delete-book/:bookId", verifyJWT, async (req, res) => {
  try {
    const id = req.user?._id;
    const { bookId } = req.params;
    const user = await User.findById({ id });

    if (user.role !== "admin") {
      res.status(401).json({ message: "you are not authorized" });
    }

    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(401).json({ message: "error while deletinh book" });
    }
    res.status(200).json({ message: "book has been dleetd" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "error while trying to update book by  user" });
  }
});
router.get("/all-books", async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    if (!books) {
      return res.status(401).json({ message: "error while deletinh book" });
    }
    return res
      .status(200)
      .json({ message: "fetching sucess all books fetched", data: books });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "error while trying to update book by  user" });
  }
});
router.get("/recently-added", async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }).limit(4);
    if (!books) {
      return res.status(401).json({ message: "error while fetching book" });
    }
    return res
      .status(200)
      .json({ message: "recently created books", data: books });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "error while trying to update book by  user" });
  }
});
router.get("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(401).json({ message: "error while deletinh book" });
    }

    return res
      .status(200)
      .json({ data: book, message: "book has been fetched" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "error while trying to update book by  user" });
  }
});
module.exports = router;
