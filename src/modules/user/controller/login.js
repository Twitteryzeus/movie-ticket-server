const Joi = require('joi');
const config = require('../../../config');
const { generateJWT } = require('../../../utils/authentication');
const hashFunction = require('../../../utils/hash-function');
const logger = require('../../../utils/logger');

const login = async (req, res) => {
  const response = {
    message: 'Login Successfully',
    success: true,
    status: 200,
    data: ''
  }

  try {
    const payload = req.body;

    const loginSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    });

    const { error } = loginSchema.validate(payload);
    if (error) {
      response.message = error?.message;
      response.success = false;
      response.status = 500;

      logger.error(`ERROR > LOGIN > ${error.message}`);
      return res.status(response.status).json(response);
    }

    payload.role = config.adminEmail === payload.email ? 'ADMIN' : 'USER';
    payload.id = hashFunction(payload.name);
    response.data = generateJWT(payload);

    logger.info(`Login done successfully for ${payload.name}`);
  } catch (error) {
    response.message = error?.message;
    response.success = false;
    response.status = 500;
    logger.error(`ERROR > LOGIN > ${error.message}`);
  }

  return res.status(response.status).json(response);
}

module.exports = login;