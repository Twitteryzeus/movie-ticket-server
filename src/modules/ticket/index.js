const express = require('express');
const router = express.Router();
const ticketController = require('./controller');
const { decodeJWT, roleBasedCheck } = require('../../utils/authentication');
const roleAccess = require('./role-access.json');

router.post('/ticket/create', decodeJWT, roleBasedCheck(roleAccess.CREATE), ticketController.create);
router.get('/ticket/analytics', decodeJWT, roleBasedCheck(roleAccess.ANALYTICS), ticketController.analytics);
router.get('/ticket/view/:id', decodeJWT, roleBasedCheck(roleAccess.VIEW), ticketController.view);

module.exports = router;