import express from 'express';
import session from 'express-session';
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let thisSession = req.session;
  if(thisSession.isAuthenticated){
    res.json({
      status: "loggedin",
      userInfo: {
          name: thisSession.account.name,
          username: thisSession.account.username
      }
      });
  } else {
    res.json({ status: "loggedout" });
  }
});


// POST user's game vote
router.post('/vote', async (req, res) => {
  try {
    let thisSession = req.session;
    console.log("catagories: ", req.body.categoryName);
    const currentCategory = await req.models.Category.findOne({ name: req.body.categoryName });
    if (thisSession.isAuthenticated) {
      const newVote = new req.models.Vote({
        userName: thisSession.account.username,
        gameTitle: req.body.gameTitle,
        gameImageUrl: req.body.gameImageUrl,
        date: Date.now(),
        categoryID: currentCategory._id,
      });

      await newVote.save();
      res.json({ status: "success" });

    } else {
      res.send('Error: You must be logged in to vote for a game');
    }
  } catch(error) {
    console.log("Error getting url preview: ", error);
    res.status(500).json({status: "error", "error": error});
  }
});

// GET user's game votes
router.get('/vote', async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      if (!req.query.username){
        let allVotes = await req.models.Vote.find({userName: req.session.account.username});
        // May need to map this, will do later
        res.json(allVotes);
      } else {
        let returnVotes = await req.models.Vote.find({userName: req.query.username});
        res.json(returnVotes);
      }

        
    } else {
      res.send('Error: You must be logged in to vote for a game');
    }
  } catch(error) {
    console.log("Error getting url preview: ", error);
    res.status(500).json({status: "error", "error": error});
  }
});

// POST change user's vote on specific cataogry
router.post('/vote-change', async (req, res) => {
  try {
    let thisSession = req.session;
    let thisCatagory = req.body.categoryID;
    let newGameTitle = req.body.gameTitle;
    let newGameImage = req.body.gameImageUrl;
    if (thisSession.isAuthenticated) {
      const update = await req.models.Vote.update({userName: thisSession.account.username, categoryID: thisCatagory}, {gameTitle: newGameTitle, gameImageUrl: newGameImage});
      res.json({ status: "success" });
    } else {
      res.send('Error: You must be logged in to vote for a game');
    }
  } catch(error) {
    console.log("Error getting url preview: ", error);
    res.status(500).json({status: "error", "error": error});
  }
});



// DELETE user's game vote
router.get('/clear', async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      await req.models.Vote.remove({username: req.session.account.username});
      res.json({status: "success"});
    } else {
      res.send('Error: You must be logged in to delete for a game');
    }
  } catch(error) {
    console.log("Error getting url preview: ", error);
    res.status(500).json({status: "error", "error": error});
  }
});


export default router;
