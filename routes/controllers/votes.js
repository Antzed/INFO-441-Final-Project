import express from 'express';
import session from 'express-session';
var router = express.Router();

import { mostFrequent } from '../utils/maxFrequent.js';

router.get('/count', async function(req, res, next) {
    const votes =  await req.models.Vote.find({categoryID: req.query.categoryID});
    // find the game name with that appears the most in the votes
    let gamesNames = [];
    let gameImageUrl = [];
    votes.forEach(vote => {
        gamesNames.push(vote.gameTitle);
        gameImageUrl.push(vote.gameImageUrl);
    });
    


    let mostFrequentGameNames = mostFrequent(gamesNames, gamesNames.length);
    let mostFrequentGameImageUrl = mostFrequent(gameImageUrl, gameImageUrl.length);

    res.json({gameTitle: mostFrequentGameNames[0], gameImageUrl: mostFrequentGameImageUrl[0], count: mostFrequentGameNames[1]});
});


export default router;