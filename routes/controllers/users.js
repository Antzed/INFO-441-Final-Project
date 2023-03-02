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
    let voteCheck = await req.models.Vote.exists({ userName: thisSession.account.username, categoryID: currentCategory._id });
    console.log("currentCategory: ", currentCategory);
    if (thisSession.isAuthenticated) {
      
      if (!voteCheck) {
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
        let updateVote = await req.models.Vote.findOneAndUpdate({ userName: thisSession.account.username, categoryID: currentCategory._id }, { gameTitle: req.body.gameTitle, gameImageUrl: req.body.gameImageUrl, date: Date.now() });
        res.json({ status: "success" });
      }
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
    let thisSession = req.session;
    if (thisSession.isAuthenticated) {
      let allVotes = await req.models.Vote.find({userName: thisSession.account.username});
      // May need to map this, will do later
      res.json(allVotes);

        
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
    let thisSession = req.session;
    let username = thisSession.account.username;
    // get rid of spaces in username
    username = username.replace(/\s/g, '');
    console.log("username:", username);
    
    if (thisSession.isAuthenticated) {

      // const 
      const deleteVote = await req.models.Vote.deleteMany({userName: username});
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
