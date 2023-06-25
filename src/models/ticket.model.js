const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ticket = sequelize.define('Ticket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    showId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    seatBooked: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'ticket'
  });

  Ticket.associate = function (models) {
    Ticket.belongsTo(models.Movie, {
      as: 'movie',
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      targetKey: 'id'
    });
  
    Ticket.belongsTo(models.Show, {
      as: 'show',
      foreignKey: {
        name: 'showId',
        allowNull: false,
      },
      targetKey: 'id'
    });
  }

  return Ticket;
};
