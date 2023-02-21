const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const { findByIdAndUpdate } = require("../models/User.model");
const User = require("../models/User.model");
const myApiId = process.env.API_KEY;

router.get("/movies", (req, res, next) => {
  const userInput = req.query.title;
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://imdb-api.com/en/API/SearchTitle/${myApiId}/${userInput}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result.results)
        res.render("movies", { result });
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/best-movies", (req, res, next) => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://imdb-api.com/en/API/Top250Movies/${myApiId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        res.render("best-movies", { result });
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/movie-details/:id", (req, res, next) => {
  const movieId = req.params.id;
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://imdb-api.com/en/API/Title/${myApiId}/${movieId}/FullActor,FullCast,Posters,Images,Trailer,Ratings,`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        Movie.create({
          apiId: result.id,
          title: result.title,
          genre: result.genres,
          rating: result.imDbRating,
        });

        console.log(result);
        res.render("movie-details", { result });
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addMovie/:id", isLoggedIn, async (req, res, next) => {
  const apiId = req.params.id;
  const currentUser = req.session.currentUser;
  console.log(currentUser);
  console.log(apiId);
  try {
    const userFavourite = await Movie.findOne({ apiId: apiId });
    await User.findByIdAndUpdate(
      currentUser._id,
      { $addToSet: { favoriteMovies: userFavourite._id } },
      { new: true }
    );
    //likes

    res.redirect(`/movie-details/${apiId}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/removeMovie/:id", async (req, res, next) => {
  const apiId = req.params.id
  const currentUser = req.session.currentUser

  try {
    const removeFav = await Movie.findOne({apiId: apiId})

    await User.findByIdAndUpdate(currentUser._id,
      
      {$pull: { favoriteMovies: removeFav._id },
    });
    //const removeFav = await Movie.findByIdAndRemove(apiId);

    res.redirect(`/movie-details/${apiId}`);
    
    
    
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/best-series", (req, res, next) => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://imdb-api.com/en/API/Top250TVs/${myApiId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        res.render("best-series", { result });
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/serie-details/:id", (req, res, next) => {
  const movieId = req.params.id;
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://imdb-api.com/en/API/Title/${myApiId}/${movieId}/FullActor,FullCast,Posters,Images,Trailer,Ratings,`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        res.render("serie-details", { result });
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
