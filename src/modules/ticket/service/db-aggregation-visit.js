const { sequelize } = require('../../../models');
const DB_CONST = require('../../../utils/db-constants');
const { QueryTypes } = require('sequelize');
const { pick } = require('lodash');
const logger = require('../../../utils/logger');

const dbAggregationVisitMethod = async (req) => {
  try {
    const { query, user } = req;

    const selectQuery = `
    SELECT
	    REPLACE((TO_CHAR(${DB_CONST.CREATED_AT}, 'Month')), ' ', '') as "${DB_CONST.MONTH}",
	    SUM(${DB_CONST.SEAT_BOOKED}) AS "${DB_CONST.SUMMARY_VISIT}"
    FROM
	    ${DB_CONST.TICKET_TABLE_NAME}
    WHERE
	    ${DB_CONST.MOVIE_ID} = :movieId
      AND ${DB_CONST.CREATED_AT} BETWEEN :startDate AND :endDate
    GROUP BY
	    REPLACE((TO_CHAR(${DB_CONST.CREATED_AT}, 'Month')), ' ', ''),
	    ${DB_CONST.SEAT_BOOKED};`;

    const data = await sequelize.query(selectQuery, {
      type: QueryTypes.SELECT,
      replacements: pick(query, ['movieId', 'startDate', 'endDate'])
    });

    logger.info(`Visit analytics fetched successfully for movie ${query.movieId} by ${user.name}`)
    return data;
  } catch (error) {
    logger.error(`ERROR > TICKET > SERVICE > VISIT > ${error.message}`)
    throw error;
  }
}

module.exports = dbAggregationVisitMethod;