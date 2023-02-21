const { Schema, model } = require("mongoose");
const Movie = require("./Movie.model");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default: "https://shamelesstale.files.wordpress.com/2016/03/cat-sneeze14.jpg",
   },

   description: {
    type: String,
   },

   favoriteMovies: [{
    type: Schema.Types.ObjectId, 
    ref: 'Movie',
  }],

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
