const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/signup
router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup");
});

// POST /auth/signup
router.post(
  "/signup",
  isLoggedOut,
  fileUploader.single("poster"),
  (req, res, next) => {
    const { username, password, description } = req.body;

    // Check that username, email, and password are provided
    if (username === "" || password === "") {
      res.status(400).render("auth/signup", {
        errorMessage:
          "All fields are mandatory. Please provide your username and password.",
      });

      return;
    }

    if (password.length < 6) {
      res.status(400).render("auth/signup", {
        errorMessage: "Your password needs to be at least 6 characters long.",
      });

      return;
    }
    // Search the database for a user with the username submitted in the form
    User.findOne({ username }).then((found) => {
      // If the user is found, send the message username is taken
      if (found) {
        return res.status(400).render("auth/signup", {
          errorMessage: "Username already taken.",
        });
      }
      //   ! This regular expression checks password for special characters and minimum length
      /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  */ let userImage;
      if (req.file) {
        userImage = req.file.path;
      }
      // Create a new user - start by hashing the password
      bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          // Create a user and save it in the database
          return User.create({
            username,
            password: hashedPassword,
            description,
            imageUrl: userImage,
          });
        })
        .then((user) => {
          req.session.currentUser = user;

          res.redirect("/profile");
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            res
              .status(500)
              .render("auth/signup", { errorMessage: error.message });
          } else if (error.code === 11000) {
            res.status(500).render("auth/signup", {
              errorMessage: "Username to be unique. Provide a valid username.",
            });
          } else {
            next(error);
          }
        });
    });
  }
);

// GET /auth/login
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      res.render("auth/login", { errorMessage: "Please input all the fields" });
    }

    let user = await User.findOne({ username });

    if (!user) {
      res.render("auth/login", {
        errorMessage: "Account does not exist, please sign up",
      });
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;

      res.redirect("/profile");
    } else {
      res.render("auth/login", { errorMessage: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /auth/logout
router.get("/logout", (req, res) => {
  res.clearCookie('nToken');
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/");
  });
});

module.exports = router;
