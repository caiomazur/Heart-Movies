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

    userfavorite: [{
        type: Schema.Types.ObjectId, 
        ref: 'User',
      }],

  },
  
  {
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);
module.exports = Movie;
