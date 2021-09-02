const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserHobby extends Model {}

UserHobby.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references:{
        model: 'user',
        key: 'id',
      }
    },
    hobby_id: {
      type: DataTypes.INTEGER,
      references:{
        model:'hobby',
        key:'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_hobby',
  }
);

module.exports = UserHobby;
