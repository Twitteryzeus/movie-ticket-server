const Joi = require("joi");
const { sequelize } = require("../../../models");
const logger = require("../../../utils/logger");
const { isEmpty } = require('lodash');

const analytics = async (req, res) => {
  const response = {
    message: 'Analytics fetched successfully!',
    status: 200,
    success: true,
    data: []
  };

  try {
    const { models } = sequelize;
    const { Show: ShowModel } = models;
    const { user, query } = req;

    if (isEmpty(query)) {
      response.message = 'Query params is missing!';
      response.success = false;
      response.status = 400;
      
      logger.error('ERROR > TICKET > ANALYTICS > Query params not provided');
      return res.status(response.status).json(response);
    }

    const analyticsSchema = Joi.object({
      method: Joi.string().required().valid('db-aggregation', 'algorithm'),
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().required(),
    });

    const { error } = analyticsSchema.validate(query);
    if (error) {
      response.message = error?.message;
      response.success = false;
      response.status = 400;

      logger.error(`ERROR > TICKET > ANALYTICS > ${error.message}`);
      return res.status(response.status).json(response);
    }
  } catch (error) {
    response.message = error?.message;
    response.success = false;
    response.status = 500;
    logger.error(`ERROR > TICKET > ANALYTICS > ${error.message}`);
  }

  return res.status(response.status).json(response);
}

module.exports = analytics;