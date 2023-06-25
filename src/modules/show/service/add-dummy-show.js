const logger = require('../../../utils/logger');
const { sequelize, Sequelize } = require('../../../models/');
const moment = require('moment');

/**
 * A service method to add dummy shows for the movie.
 * 
 * @param {number} movieId - The movieId for which the show to be added. 
 * @returns {Promise<Object>} - Returns the created show instance.
 */
const addDummyShows = async (movieId = 0) => {
  try {
    const { models } = sequelize;
    const { Show: ShowModel, Movie: MovieModel } = models;
    const showInsertPayload = { movieId, availableSeat: 100, showTime: moment() };

    const [latestShowInstance] = await ShowModel.findAll({
      include: {
        model: MovieModel,
        as: 'movie',
        attributes: []
      },
      attributes: ['createdAt', [Sequelize.literal('"movie"."duration"'), 'duration']],
      order: [['createdAt', 'DESC']]
    });

    if (latestShowInstance) showInsertPayload.showTime = moment(moment(latestShowInstance.createdAt).format('YYYY-MM-DD HH:mm:ss')).add(latestShowInstance.duration, 'hour');

    logger.info(`Show added for ${movieId}`);
    return ShowModel.create(showInsertPayload);
  } catch (error) {
    logger.error(`ERROR > SHOW > SERVICE > ADD DUMMY SHOW > ${error?.message}`)
    throw error;
  }
}

module.exports = addDummyShows;