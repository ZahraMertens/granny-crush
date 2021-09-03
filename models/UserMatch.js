const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserMatch extends Model {}

UserMatch.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // no need to define columns here as it will be automatically added in index
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_match',
  }
);

module.exports = UserMatch;
