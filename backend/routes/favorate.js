const router = require("express").Router();
const User = require("../models/user");
const verifyJWT = require("../middleware/verifyJWT.js");

//add to favorate
router.patch("/add-favorate/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user?._id);
    const isBookFavorate = user.favorates.includes(id);

    if (isBookFavorate) {
      const data = await User.findByIdAndUpdate(req.user?._id, {
        $pull: { favorates: id },
      });
      return res.status(200).json({ data: data, message: " removed from fav" });
    }
    const data = await User.findByIdAndUpdate(req.user?._id, {
      $push: { favorates: id },
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
/* router.delete("delete-favorate/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user?._id);
    const isBookFavorate = user.favorates.includes(id);
    if (isBookFavorate) {
      await User.findByIdAndUpdate(req.user?._id, {
        $pop: { favorites: id },
      });
    }

    return res.status(200).json({ message: " removed from fav" });
  } catch (error) {
    return res.status(500).json({ message: "error server" });
  }
}); */
module.exports = router;
