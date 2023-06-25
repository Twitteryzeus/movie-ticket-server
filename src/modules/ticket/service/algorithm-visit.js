const logger = require("../../../utils/logger");
const { sequelize } = require('../../../models');
const moment = require('moment');

/**
 * Gets monthly report of how a movie has performed visibility wise. Using javascript data structures and methods.
 * 
 * @param {Request} req - The Express request object. 
 * @returns {Promise<Array<Object>>} - Returns the monthly report. 
 */
const algorithmVisit = async (req) => {
  try {
    const { user, query } = req;
    const { models } = sequelize;
    const { Ticket: TicketModel } = models;
    const ticketInstanceArray = await TicketModel.findAll({ raw: true });
    const monthlyVisitMapper = {};

    const filteredTicketInstanceArray = ticketInstanceArray.filter((item) => {
      item.month = moment(item.createdAt).format('MMMM');
      return (
        item.movieId == query.movieId &&
        moment(item.createdAt).format('YYYY-MM-DD') > query.startDate &&
        moment(item.createdAt).format('YYYY-MM-DD') < query.endDate
      )
    });

    for (let i = 0; i < filteredTicketInstanceArray.length; i++) {
      if (!monthlyVisitMapper[filteredTicketInstanceArray[i].month]) {
        monthlyVisitMapper[filteredTicketInstanceArray[i].month] = {
          month: filteredTicketInstanceArray[i].month,
          summaryVisit: +filteredTicketInstanceArray[i].ticketPrice
        };
      } else {
        monthlyVisitMapper[filteredTicketInstanceArray[i].month].summaryVisit =
          monthlyVisitMapper[filteredTicketInstanceArray[i].month].summaryVisit +
          +filteredTicketInstanceArray[i].ticketPrice;
      }
    }

    logger.info(`Algorithm visit processed successfully for movie ${query.movieId} by ${user.name}`);
    return Object.values(monthlyVisitMapper);
  } catch (error) {
    logger.error(`ERROR > TICKET > SERVICE > ALGORITHM VISIT > ${error.message}`);
    throw error;
  }
}

module.exports = algorithmVisit