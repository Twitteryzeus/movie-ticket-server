const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Show = sequelize.define('Show', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    availableSeat: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false
    },
    filledSeat: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    showTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    tableName: 'show'
  });

  Show.associate = function (models) {
    Show.belongsTo(models.Movie, {
      as: 'movie',
      foreignKey: {
        name: 'movieId',
        allowNull: false,
      },
      targetKey: 'id'
    });
  
    Show.hasMany(models.Ticket, {
      as: 'showTickets',
      foreignKey: 'showId',
      constraints: true,
      onDelete: 'CASCADE',
    });
  }

  return Show;
};
