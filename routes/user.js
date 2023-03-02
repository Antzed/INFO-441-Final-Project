import express from 'express';
import session from 'express-session';
var router = express.Router();

router.get('/', async function(req, res, next) {
    // send frontend/build folder
    res.sendFile('index.html', { root: 'Frontend/build' });
});

export default router;