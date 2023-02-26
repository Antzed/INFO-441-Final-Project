import express from 'express';
var router = express.Router();

import usersRouter from './controllers/users.js';
import gamesRouter from './controllers/games.js';
import categoriesRouter from './controllers/categories.js';

router.use('/users', usersRouter);
router.use('/games', gamesRouter);
router.use('/categories', categoriesRouter);

export default router;