const express =  require('express');
const router = express.Router();
const userRouter = require('./user');
const movieRouter = require('./movie');

// Add All router to a common point.
router.use(userRouter);
router.use(movieRouter);

module.exports = router;