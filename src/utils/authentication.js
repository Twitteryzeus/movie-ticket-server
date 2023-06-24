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
    if(token.split(' ')[0] !== "Bearer") throw new Error('Invalid Token');

    const authenticationToken = token.split(' ')[1];
    const decoded = jwt.verify(authenticationToken, config.jwt.signature);
    req.user = decoded;

    logger.info('JWT decoded successfully');
    return next();
  } catch (error) {
    logger.error(`ERROR > DECODE JWT > ${error?.message}`);
    throw error;
  }
}

module.exports = {
  generateJWT,
  decodeJWT
}