const logger = require("../../../utils/logger");
const { sequelize } = require('../../../models');
const Joi = require('joi');
const showServiceFunctions = require('../../show/service');

/**
 * Creates a new movie and along with that adds a show for this movie.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express request object.
 */
const create = async (req, res) => {
  const response = {
    message: 'Movie created successfully!',
    status: 200,
    success: true,
    data: {}
  };

  try {
    const { models } = sequelize;
    const { user, body: payload } = req;
    const { Movie: MovieModel } = models;

    const movieCreateSchema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required().min(0).max(1000),
      duration: Joi.number().optional().min(1).max(5)
    });

    const { error } = movieCreateSchema.validate(payload);
    if (error) {
      response.message = error?.message;
      response.success = false;
      response.status = 400;

      logger.error(`ERROR > MOVIE > CREATE > ${error.message}`);
      return res.status(response.status).json(response);
    }

    const movieInstance = await MovieModel.create(payload);
    await showServiceFunctions.addDummyShows(movieInstance.id);
    
    response.data = movieInstance;
    logger.info(`Movie created successfully by ${user.name}`);
  } catch (error) {
    response.message = error?.message;
    response.success = false;
    response.status = 500;
    logger.error(`ERROR > MOVIE > CREATE > ${error.message}`);
  }

  res.status(200).json(response);
}

module.exports = create;