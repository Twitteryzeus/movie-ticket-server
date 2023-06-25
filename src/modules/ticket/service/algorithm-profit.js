const logger = require("../../../utils/logger");
const { sequelize } = require('../../../models');
const moment = require('moment');

/**
 * Gets monthly report of how a movie has performed profit wise. Using javascript data structures and methods.
 * 
 * @param {Request} req - The Express request object. 
 * @returns {Promise<Array<Object>>} - Returns the monthly report. 
 */
const algorithmProfit = async (req) => {
  try {
    const { user, query } = req;
    const { models } = sequelize;
    const { Ticket: TicketModel } = models;
    const ticketInstanceArray = await TicketModel.findAll({ raw: true });
    const monthProfitMapper = {};

    const filteredTicketInstanceArray = ticketInstanceArray.filter((item) => {
      item.month = moment(item.createdAt).format('MMMM');
      return (
        item.movieId == query.movieId &&
        moment(item.createdAt).format('YYYY-MM-DD') > query.startDate &&
        moment(item.createdAt).format('YYYY-MM-DD') < query.endDate
      )
    });

    for (let i = 0; i < filteredTicketInstanceArray.length; i++) {
      if (!monthProfitMapper[filteredTicketInstanceArray[i].month]) {
        monthProfitMapper[filteredTicketInstanceArray[i].month] = {
          month: filteredTicketInstanceArray[i].month,
          summaryProfit: +filteredTicketInstanceArray[i].ticketPrice
        };
      } else {
        monthProfitMapper[filteredTicketInstanceArray[i].month].summaryProfit =
          monthProfitMapper[filteredTicketInstanceArray[i].month].summaryProfit +
          +filteredTicketInstanceArray[i].ticketPrice;
      }
    }

    logger.info(`Algorithm profit processed successfully for movie ${query.movieId} by ${user.name}`);
    return Object.values(monthProfitMapper);
  } catch (error) {
    logger.error(`ERROR > TICKET > SERVICE > ALGORITHM PROFIT > ${error.message}`);
    throw error;
  }
}

module.exports = algorithmProfit