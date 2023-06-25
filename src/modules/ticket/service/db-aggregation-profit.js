const { sequelize } = require('../../../models');
const DB_CONST = require('../../../utils/db-constants');
const { QueryTypes } = require('sequelize');
const { pick } = require('lodash');
const logger = require('../../../utils/logger');

const dbAggregationProfitMethod = async (req) => {
  try {
    const { query, user } = req;

    const selectQuery = `
    SELECT
	    REPLACE((TO_CHAR(${DB_CONST.CREATED_AT}, 'Month')), ' ', '') as "${DB_CONST.MONTH}",
	    SUM(${DB_CONST.TICKET_PRICE}) AS "${DB_CONST.SUMMARY_PROFIT}"
    FROM
	    ${DB_CONST.TICKET_TABLE_NAME}
    WHERE
	    ${DB_CONST.MOVIE_ID} = :movieId
      AND ${DB_CONST.CREATED_AT} BETWEEN :startDate AND :endDate
    GROUP BY
	    REPLACE((TO_CHAR(${DB_CONST.CREATED_AT}, 'Month')), ' ', ''),
	    ${DB_CONST.TICKET_PRICE};`;

    const data = await sequelize.query(selectQuery, {
      type: QueryTypes.SELECT,
      replacements: pick(query, ['movieId', 'startDate', 'endDate'])
    });

    logger.info(`Profit analytics fetched successfully for movie ${query.movieId} by ${user.name}`)
    return data;
  } catch (error) {
    logger.error(`ERROR > TICKET > SERVICE > PROFIT > ${error.message}`)
    throw error;
  }
}

module.exports = dbAggregationProfitMethod;