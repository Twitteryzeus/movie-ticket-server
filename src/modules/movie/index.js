const express = require('express');
const router = express.Router();
const movieController = require('./controller');
const { decodeJWT, roleBasedCheck } = require('../../utils/authentication');
const roleAccess = require('./role-access.json');

// Add API routes here.
router.get('/movie/list', decodeJWT, movieController.list);
router.post('/movie/create', decodeJWT, roleBasedCheck(roleAccess.CREATE), movieController.create);

module.exports = router;