const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Hobby extends Model { }

Hobby.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hobby_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'hobby',
  }
);

module.exports = Hobby;
