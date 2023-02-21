const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const { findByIdAndUpdate } = require("../models/User.model");
const User = require("../models/User.model");
const myApiId = process.env.API_KEY;
const axios = require("axios");


router.get("/movies", async (req, res, next) => {

  const userInput = req.query.title;
  try {
    
    const response = await axios.get(
      `https://imdb-api.com/en/API/SearchTitle/${myApiId}/${userInput}`
    );
    const result = response.data;
    //console.log(response);
    console.log("result____________", result);

        res.render("movies", { result });

  } catch (error) {
    console.log(error);
  }
});

router.get("/best-movies", async (req, res, next) => {
  try {

    const response = await axios.get(
      `https://imdb-api.com/en/API/Top250Movies/${myApiId}`
    );
    const result = response.data;
    //console.log(response);
    console.log("result____________", result);
        res.render("best-movies", { result });
      
  } catch (error) {
    console.log(error);
  }
});

router.get("/movie-details/:id", async (req, res, next) => {
  const movieId = req.params.id;
  console.log("movieId ___________________", movieId);

  try {

    const response = await axios.get(
      `https://imdb-api.com/en/API/Title/${myApiId}/${movieId}/FullActor,FullCast,Posters,`
    );
    const result = response.data;
    //console.log(response);
    console.log("result____________", result);

    await Movie.create({
      apiId: result.id,
      title: result.title,
      genres: result.genres,
      imDbRating: result.imDbRating,
      image: result.image,
      plot: result.plot,
      stars: result.stars,
      directors: result.directors,
    });

    /* console.log(result); */
    res.render("movie-details", { result });
  } catch (error) {
    console.log("ola", error);
    next(error);
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
      { $push: { favoriteMovies: userFavourite._id } },
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
  const apiId = req.params.id;
  const currentUser = req.session.currentUser;

  try {
    const removeFav = await Movie.findOne({ apiId: apiId });

    await User.findByIdAndUpdate(
      currentUser._id,

      { $pull: { favoriteMovies: removeFav._id } }
    );
    //const removeFav = await Movie.findByIdAndRemove(apiId);

    res.redirect(`/movie-details/${apiId}`);

  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/best-series", async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://imdb-api.com/en/API/Top250TVs/${myApiId}`
    );
    const result = response.data;
    //console.log(response);
    console.log("result____________", result);
        // console.log(result)
        res.render("best-series", { result });
      
  } catch (error) {
    console.log(error);
  }
});

router.get("/serie-details/:id", async (req, res, next) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(
      `https://imdb-api.com/en/API/Title/${myApiId}/${movieId}/FullActor,FullCast,Posters,`
    );
    const result = response.data;
    //console.log(response);
    console.log("result____________", result);
        res.render("serie-details", { result });
      
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
