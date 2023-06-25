const Joi = require("joi");
const { sequelize } = require("../../../models");
const logger = require("../../../utils/logger");

const view = async (req, res) => {
  const response = {
    message: 'Ticket fetched successfully!',
    status: 200,
    success: true,
    data: []
  };

  try {
    const { models } = sequelize;
    const { Ticket: TicketModel } = models;
    const { user, params } = req;

    const ticketSchema = Joi.object({
      id: Joi.number().required(),
    });

    const { error } = ticketSchema.validate(params);
    if (error) {
      response.message = error?.message;
      response.success = false;
      response.status = 400;

      logger.error(`ERROR > TICKET > VIEW > ${error.message}`);
      return res.status(response.status).json(response);
    }

    const ticketInstance = await TicketModel.findOne({
      where: {
        id: params.id,
        userId: user.id
      },
      raw: true
    });

    if(!ticketInstance) {
      response.message = 'No such ticket instance found!';
      response.success = false;
      response.status = 404;

      logger.error(`ERROR > TICKET > VIEW > No such ticket instance found`);
      return res.status(response.status).json(response);
    }

    response.data = ticketInstance;
    logger.info(`Ticket ${params.id} fetched for ${user.name}`);
  } catch (error) {
    response.message = error?.message;
    response.success = false;
    response.status = 500;
    logger.error(`ERROR > TICKET > VIEW > ${error.message}`);
  }

  return res.status(response.status).json(response);
}

module.exports = view;