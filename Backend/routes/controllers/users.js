import express from 'express';
import session from 'express-session';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.isAuthenticated){
    res.send(`
      responding with information about the user
      with the name: ${req.session.account.name}
      and the username: ${req.session.account.username}
    
    `)
  } else {
    res.send('Error: You must be logged in');
  }
  
});


// POST user's game vote
router.post('/vote', async (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      let user = await req.models.User.find({userName: req.session.account.username});

      const newVote = new req.models.Vote({
        categoryID: req.body.categoryId,
        categoryName: req.body.categoryName,
        user: user._id,
        game: req.body.game,
        date: Date.now(),
      });

      await newVote.save();

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
      let user = await req.models.User.find({userName: req.session.account.username});
      
      // Check if user is in the database, if not add
      if (!user) {
        const newUser = new req.models.User({
          userName: req.session.account.username,
        });

        await newUser.save();
        user = await req.models.User.find({userName: req.session.account.username});
      }

      let allVotes = await req.models.Vote.find({user: user._id});

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

export default router;
