import express from 'express';
import request from 'request';
var router = express.Router();

import { RAWG_APIKEY, X_RAPIDAPI_KEY } from '../../credentials.js';

// rapid api options with a url variable
let options = {
    method: 'GET',
    url: 'https://rawg-video-games-database.p.rapidapi.com/games?key=' + RAWG_APIKEY,
    headers: {
      'X-RapidAPI-Key': X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
      useQueryString: true
    }
};


/* GET games listing. */
router.get('/', function(req, res, next) {
    options.url += '&search=' +  req.query.search.toLowerCase();
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        // put the names of the games into an array
        let games = [];
        let data = JSON.parse(body);
        data.results.forEach(game => {
            games.push(game.name);
        });
        console.log(games);
        res.send(games);
        options.url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=' + RAWG_APIKEY;
    });

});

router.get('/imgs', function(req, res, next) {
    options.url += '&search=' +  req.query.search.toLowerCase();
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        //put the image linkes of the games into an array
        let imgs = [];
        let data = JSON.parse(body);
        data.results.forEach(game => {
            if (game.background_image) {
                imgs.push(game.background_image);
            }
        });
        console.log(imgs);
        res.send(imgs);
        options.url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=' + RAWG_APIKEY;
    });

});

router.get('/category', async function(req, res, next) {
    const category = await req.models.Category.find();
    res.json(category);
});

router.get('/data', function(req, res, next) {
    options.url += '&search=' +  req.query.search.toLowerCase();
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        // most games do not have a description
        let data = JSON.parse(body);
        let gameData = {
            name: data.results[0].name,
            description: data.results[0].description,
            rating: data.results[0].rating,
            released: data.results[0].released,
            background_image: data.results[0].background_image,
            website: data.results[0].website,
            platforms: data.results[0].platforms,
        };
        console.log(gameData);
        res.json(gameData);
        options.url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=' + RAWG_APIKEY;
    });

});

router.get('/allvotes', async function(req, res) {
    try{
        const votes = await req.models.Vote.find({gameTitle: req.query.search});
        const categories = await req.models.Category.find();
        let data = {}
        for (let i = 0; i < votes.length; i++) {
            let category = await req.models.Category.find({_id: votes[i].categoryID});
            category = category[0]
            if (!data[category.name]) {
                data[category.name] = 1;
            } else {
                data[category.name]++;
            }
            console.log(data)
            
        };
        res.json(data);
    } catch (err) {
        console.log(err);
    }
    
});

export default router;
