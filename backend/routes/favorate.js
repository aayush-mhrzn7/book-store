const router = require("express").Router();
const User = require("../models/user");
const verifyJWT = require("./userAuth");

//add to favorate
router.patch("/add-favorate/:bookId", verifyJWT, async (req, res) => {
  try {
    const { bookId } = req.params;
    const user = await User.findById(req.user?._id);
    const isBookFavorate = user.favorates.includes(bookId);
    if (isBookFavorate) {
      return res.status(200).json({ message: "already like" });
    }
    const data = await User.findByIdAndUpdate(req.user?._id, {
      $push: { favorates: bookId },
    });
    return res.status(200).json({ data: data, message: " liked " });
  } catch (error) {
    return res.status(500).json({ message: "error server" });
  }
});
router.get("/all-favorate", verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user?._id).populate("favorates");
    const favorateBooks = user.favorates;
    return res
      .status(200)
      .json({ books: favorateBooks, message: " fetcehd all books" });
  } catch (error) {
    return res.status(500).json({ message: "error server" });
  }
});
router.delete("delete-favorate/:bookId", verifyJWT, async (req, res) => {
  try {
    const { bookId } = req.params;
    const user = await User.findById(req.user?._id);
    const isBookFavorate = user.favorates.includes(bookId);
    if (isBookFavorate) {
      await User.findByIdAndUpdate(req.user?._id, {
        $pop: { favorites: bookId },
      });
    }

    return res.status(200).json({ message: " removed from fav" });
  } catch (error) {
    return res.status(500).json({ message: "error server" });
  }
});
module.exports = router;
