const express = require('express');
const router = express.Router();
const userController = require('./controller');

// Add API routes here.
router.post('/login', userController.login);

module.exports = router;