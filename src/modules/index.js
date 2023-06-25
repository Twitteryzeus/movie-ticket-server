const express =  require('express');
const router = express.Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const showRouter = require('./show');
const ticketRouter = require('./ticket');

// Add All router to a common point.
router.use(userRouter);
router.use(movieRouter);
router.use(showRouter);
router.use(ticketRouter);

module.exports = router;