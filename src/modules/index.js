const express =  require('express');
const router = express.Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const showRouter = require('./show');

// Add All router to a common point.
router.use(userRouter);
router.use(movieRouter);
router.use(showRouter);

module.exports = router;