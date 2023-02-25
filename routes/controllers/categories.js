import express from 'express';
import session from 'express-session';
var router = express.Router();

router.get('/', async function(req, res, next) {
    // get the category name from mongoDB
    const categories = await req.models.Category.find({});
    res.json(categories);
});


export default router;