const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {
    tableName: 'movie'
  });

  // Define relation here.
  Movie.associate = function (models) {
    Movie.hasMany(models.Show, {
      as: 'shows',
      foreignKey: 'movieId',
      constraints: true,
      onDelete: 'CASCADE',
    });

    Movie.hasMany(models.Ticket, {
      as: 'tickets',
      foreignKey: 'movieId',
      constraints: true,
      onDelete: 'CASCADE',
    });
  }

  return Movie;
};
