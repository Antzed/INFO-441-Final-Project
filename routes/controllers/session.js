import express from 'express';
import session from 'express-session';
var router = express.Router();

router.get('/', function(req, res) {
    res.json(req.session)
});

export default router;