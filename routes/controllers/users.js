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




export default router;
