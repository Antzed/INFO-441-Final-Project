import express from 'express';
var router = express.Router();

import usersRouter from './controllers/users.js';
import gamesRouter from './controllers/games.js';

router.use('/users', usersRouter);
router.use('/games', gamesRouter);

export default router;