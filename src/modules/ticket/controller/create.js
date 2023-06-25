const Joi = require('joi');
const { sequelize, Sequelize } = require('../../../models');
const logger = require('../../../utils/logger');
const { Op } = require('sequelize');
const moment = require('moment');

const create = async (req, res) => {
  const response = {
    message: 'Ticket booked successfully!',
    status: 200,
    success: true,
    data: {}
  };

  try {
    const { models } = sequelize;
    const { user, body: payload } = req;
    const {
      Movie: MovieModel,
      Show: ShowModel,
      Ticket: TicketModel
    } = models;

    const ticketCreateSchema = Joi.object({
      movieId: Joi.number().required(),
      showId: Joi.number().required(),
      seatBooked: Joi.number().required()
    });

    const { error } = ticketCreateSchema.validate(payload);
    if (error) {
      response.message = error?.message;
      response.success = false;
      response.status = 400;

      logger.error(`ERROR > TICKET > CREATE > ${error.message}`);
      return res.status(response.status).json(response);
    }

    // Check whether such show with movie exists or not.
    const showData = await ShowModel.findOne({
      where: {
        id: payload.showId,
        movieId: payload.movieId,
        showTime: {
          [Op.gte]: moment()
        }
      },
      include: {
        model: MovieModel,
        as: 'movie',
        attributes: []
      },
      raw: true,
      attributes: ['id', 'availableSeat', 'filledSeat', [Sequelize.literal('"movie"."price"'), 'price']]
    });

    if (!showData) {
      response.message = 'No show were found for this movie';
      response.success = false;
      response.status = 404;

      logger.error(`No show were found for ${payload.movieId}`);
      return res.status(response.status).json(response);
    }

    if ((showData.availableSeat - showData.filledSeat) < payload.seatBooked) {
      response.message = 'No available seats found';
      response.success = false;
      response.status = 404;

      logger.error(`No seats were found while booking show ${payload.showId} for ${payload.movieId}`);
      return res.status(response.status).json(response);
    }

    const insertPayload = JSON.parse(JSON.stringify(payload));
    insertPayload.customerName = user.name;
    insertPayload.userId = user.id;
    insertPayload.ticketPrice = +showData.price * +insertPayload.seatBooked;

    await ShowModel.update({
      filledSeat: +showData.filledSeat + +insertPayload.seatBooked
    }, {
      where: {
        id: insertPayload.showId
      }
    });
    const ticketInstance = await TicketModel.create(insertPayload);

    response.data = ticketInstance;
    logger.info(`Ticket booked successfully for show ${insertPayload.showId} by ${user.name}`);
  } catch (error) {
    response.message = error?.message;
    response.success = false;
    response.status = 500;
    logger.error(`ERROR > TICKET > CREATE > ${error.message}`);
  }

  return res.status(200).json(response);
}

module.exports = create;