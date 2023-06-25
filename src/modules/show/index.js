const express = require('express');
const router = express.Router();
const showController = require('./controller');
const { decodeJWT, roleBasedCheck } = require('../../utils/authentication');
const roleAccess = require('./role-access.json');

router.get('/show/list/:movieId', decodeJWT, roleBasedCheck(roleAccess.LIST), showController.list);

module.exports = router;