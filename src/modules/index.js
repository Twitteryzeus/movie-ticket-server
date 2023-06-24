const express =  require('express');
const router = express.Router();
const userRouter = require('./user');

// Add All router to a common point.
router.use(userRouter);

module.exports = router;