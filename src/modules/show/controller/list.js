const { sequelize } = require('../../../models');
const Joi = require('joi');
const logger = require("../../../utils/logger");
const { Op } = require('sequelize');
const moment = require('moment');

const list = async (req, res) => {
  const response = {
    message: 'Show list fetched successfully!',
    status: 200,
    success: true,
    data: []
  };

  try {
    const { models } = sequelize;
    const { Show: ShowModel } = models;
    const { user, params } = req;

    const movieCreateSchema = Joi.object({
      movieId: Joi.number().required(),
    });

    const { error } = movieCreateSchema.validate(params);
    if (error) {
      response.message = error?.message;
      response.success = false;
      response.status = 400;

      logger.error(`ERROR > SHOW > LIST > ${error.message}`);
      return res.status(response.status).json(response);
    }

    const showData = await ShowModel.findAll({
      where: {
        movieId: params.movieId,
        showTime: {
          [Op.gte]: moment()
        }
      },
    });

    response.data = showData;
    logger.info(`Show Time fetched successfully by ${user.name}`);
  } catch (error) {
    response.message = error?.message;
    response.success = false;
    response.status = 500;
    logger.error(`ERROR > SHOW > LIST > ${error.message}`);
  }

  return res.status(response.status).json(response);
}

module.exports = list;