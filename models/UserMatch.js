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
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references:{
    //     model: 'user',
    //     key: 'id',
    //   }
    // },
    // match_id: {
    //   type: DataTypes.INTEGER,
    //   references:{
    //     model:'user',
    //     key:'id',
    //   }
    // }
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
