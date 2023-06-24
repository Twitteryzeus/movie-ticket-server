const express = require('express');
const router = express.Router();
const movieController = require('./controller');
const { decodeJWT } = require('../../utils/authentication');

// Add API routes here.
router.get('/movie/list', decodeJWT, movieController.list);

module.exports = router;