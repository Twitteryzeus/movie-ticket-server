const Joi = require("joi");
const { sequelize } = require("../../../models");
const logger = require("../../../utils/logger");
const moment = require("moment");

/**
 * Deletes the movie ticket if the show has not started yet.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express request object.
 */
const deleteTicket = async (req, res) => {
  const response = {
    message: 'Ticket deleted successfully!',
    status: 200,
    success: true,
    data: {},
  };

  try {
    const { models } = sequelize;
    const {
      Ticket: TicketModel,
      Show: ShowModel
    } = models;
    const { user, params } = req;

    const ticketSchema = Joi.object({
      id: Joi.number().required(),
    });

    const { error } = ticketSchema.validate(params);
    if (error) {
      response.message = error?.message;
      response.success = false;
      response.status = 400;

      logger.error(`ERROR > TICKET > DELETE > ${error.message}`);
      return res.status(response.status).json(response);
    }

    const ticketInstance = await TicketModel.findOne({
      where: {
        id: params.id,
        userId: user.id
      },
      include: {
        model: ShowModel,
        as: 'show',
        attributes: ['showTime']
      },
      raw: true
    });

    if (!ticketInstance) {
      response.message = 'No such ticket instance found!';
      response.success = false;
      response.status = 404;

      logger.error(`ERROR > TICKET > DELETE > No such ticket instance found`);
      return res.status(response.status).json(response);
    }

    if (ticketInstance['show.showTime'] < moment()) {
      response.message = 'Ticket is expired, can\'t be deleted!';
      response.success = false;
      response.status = 400;

      logger.error(`ERROR > TICKET > DELETE > Ticket is expired, can\'t be deleted`);
      return res.status(response.status).json(response);
    }

    response.data = ticketInstance;
    await TicketModel.destroy({ where: params });
    logger.info(`Ticket ${params.id} deleted for ${user.name}`);
  } catch (error) {
    response.message = error?.message;
    response.success = false;
    response.status = 500;
    logger.error(`ERROR > TICKET > DELETE > ${error.message}`);
  }

  return res.status(response.status).json(response);
};

module.exports = deleteTicket;