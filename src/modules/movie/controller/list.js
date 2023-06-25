const { sequelize } = require('../../../models');
const logger = require('../../../utils/logger');

const list = async (req, res) => {
  const response = {
    message: 'Movie list fetched successfully!',
    status: 200,
    success: true,
    data: []
  };

  try {
    const { models } = sequelize;
    const { Movie: MovieModel } = models;
    const { user } = req;

    const data = await MovieModel.findAll();
    response.data = data;

    logger.info(`Movie fetched successfully by ${user.name}`);
  } catch (error) {
    response.message = error?.message;
    response.success = false;
    response.status = 500;
    logger.error(`ERROR > MOVIE > LIST > ${error.message}`);
  }

  res.status(200).json(response);
}

module.exports = list;