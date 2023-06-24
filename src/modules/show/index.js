const express = require('express');
const router = express.Router();
const showController = require('./controller');
const { decodeJWT } = require('../../utils/authentication');

router.get('/show/list/:movieId', decodeJWT, showController.list);

module.exports = router;