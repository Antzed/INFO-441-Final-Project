import express from 'express';
import session from 'express-session';
var router = express.Router();

router.get('/', async function(req, res, next) {
    // get the category name from mongoDB
    const categories = await req.models.Category.find({});
    let categoryNames = [];
    categories.forEach(category => {
        categoryNames.push(category.name);
    });
    res.send(categoryNames);
});


export default router;