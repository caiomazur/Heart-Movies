const {Schema, model} = require('mongoose')

const movieSchema = new Schema ({
    apiId:String,
    title: String, 
    genre: String, 
    plot: String, 
    stars: String, 
    image: String, 
    rating: Number,
    trailer: String, 
    directors: String,
},
{
    timestamps: true, 
})

const Movie = model("Movie", movieSchema)
module.exports = Movie;