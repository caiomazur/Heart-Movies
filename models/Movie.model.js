const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    apiId: String,
    title: String,
    genres: String,
    plot: String,
    stars: String,
    image: String,
    imDbRating: String,
    directors: String,
  },
  {
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);
module.exports = Movie;
