const jwt = require('jsonwebtoken');
const { isEmpty } = require('lodash');
const config = require('../config');
const logger = require('./logger');

const generateJWT = (payload = {}) => {
  try {
    payload = isEmpty(payload) ? {} : payload;
    const token = jwt.sign({ data: payload }, config.jwt.signature, { expiresIn: config.jwt.expiresIn });

    logger.info('JWT generated successfully')
    return token;
  } catch (error) {
    logger.error(`ERROR > GENERATE JWT > ${error?.message}`);
    throw error;
  }
}

const decodeJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new Error('Please login First!');
    if (token.split(' ')[0] !== "Bearer") throw new Error('Invalid Token!');

    const authenticationToken = token.split(' ')[1];
    const decoded = jwt.verify(authenticationToken, config.jwt.signature);
    req.user = decoded.data;

    logger.info('JWT decoded successfully');
    return next();
  } catch (error) {
    logger.error(`ERROR > DECODE JWT > ${error?.message}`);
    res.status(500).json({ error: error.message })
  }
}

const roleBasedCheck = (allowedRole = []) => {
  return (req, res, next) => {
    const { user } = req;
    if (!allowedRole.includes(user.role)) {
      logger.error(`Role based verification failed for ${user.name}`);
      return res.status(401).json({ error: 'You don\'t have permission to access this.' });
    }
    logger.info(`Role based verification done for ${user.name}`);
    next();
  };
}

module.exports = {
  generateJWT,
  decodeJWT,
  roleBasedCheck
}