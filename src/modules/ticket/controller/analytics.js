const Joi = require("joi");
const logger = require("../../../utils/logger");
const { isEmpty } = require('lodash');
const ticketService = require('../service');

const analytics = async (req, res) => {
  const response = {
    message: 'Analytics fetched successfully!',
    status: 200,
    success: true,
    data: []
  };

  try {
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
      type: Joi.string().required().valid('profit', 'visit'),
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().required(),
      movieId: Joi.number().required()
    });

    const { error } = analyticsSchema.validate(query);
    if (error) {
      response.message = error?.message;
      response.success = false;
      response.status = 400;

      logger.error(`ERROR > TICKET > ANALYTICS > ${error.message}`);
      return res.status(response.status).json(response);
    }

    if(query.type === "profit") {
      if(query.method === "db-aggregation") {
        response.data = await ticketService.dbAggregationProfitMethod(req);
      }
    }

    logger.info(`Ticket analytics retrieved by ${user.name}`);
  } catch (error) {
    response.message = error?.message;
    response.success = false;
    response.status = 500;
    logger.error(`ERROR > TICKET > ANALYTICS > ${error.message}`);
  }

  return res.status(response.status).json(response);
}

module.exports = analytics;