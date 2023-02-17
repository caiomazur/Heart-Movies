const express = require('express');
const router = express.Router();

/* GET home page */


const imdbApi = imdb-api({
  apiKey: process.env.API_KEY,
  
}); 

router.get("/", (req, res, next) => {

  try {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch('https://imdb-api.com/en/API/Top250TVs', requestOptions)
      .then(response => response.json())
      .then(result => {
        res.render('index', {result})

        console.log(result)})
    
  } catch (error) {
    console.log(error)
    
  }
});

module.exports = router;
