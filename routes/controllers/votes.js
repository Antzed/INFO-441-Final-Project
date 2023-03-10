import express from 'express';
import session from 'express-session';
var router = express.Router();

import { mostFrequent } from '../utils/maxFrequent.js';

router.get('/count', async function(req, res, next) {
    try {
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
    } catch(error) {
        console.log("Error getting url preview: ", error);
        res.status(500).json({status: "error", "error": error});
    }
});

//This function is deprecated

// returns number of votes for each category for an input game title. 
// router.get('/gameVoteCount', async function(req, res, next) {
//     try {
//         const gameTitle = req.query.gameTitle;
//         const gameVotes = await req.models.Vote.find({gameTitle: gameTitle});
    
//         let voteCount = [];
//         gameVotes.forEach(vote => {
//             let categoryIndex = voteCount.findIndex(cat => cat.categoryID === "" + vote.categoryID)
//             if (categoryIndex == -1) {
//                 voteCount.push({categoryID: "" + vote.categoryID, count: 1});
//             } else {
//                 voteCount[categoryIndex].count += 1;
//             }
//         });
    
//         res.json(voteCount);
//     } catch(error) {
//         console.log("Error getting url preview: ", error);
//         res.status(500).json({status: "error", "error": error});
//     }
// });


export default router;