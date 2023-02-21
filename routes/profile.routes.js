const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();
const User = require("../models/User.model");
const fileUploader = require('../config/cloudinary.config');

/* GET home page */

router.get("/profile", isLoggedIn, async (req, res, next) => {
  let user = req.session.currentUser;
  const checkUser = await User.findById(user).populate('favoriteMovies')
  console.log(user);
  console.log(checkUser);

  res.render("profile", {checkUser});
});

router.get("/edit-profile/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("edit-profile", user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// 

router.post("/edit-profile/:id", fileUploader.single('poster'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, description, currentImage } = req.body;
    console.log(username);
    console.log(req.body);
    let imageUrl;

    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = currentImage;
    }

    let updatedUser = await User.findByIdAndUpdate(
      id,
      { username, description, imageUrl },
      { new: true }
    );

    req.session.currentUser = updatedUser;

    res.redirect("/profile");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/edit-profile/:id/delete', async (req, res, next) => {
     try {
      const {id} = req.params
      await User.findByIdAndDelete(id)
      res.redirect('/')
  
}    catch (error) {
      console.log(error);
       next(error);
}
})



module.exports = router;
