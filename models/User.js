const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    gender: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    phone: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    postcode: {
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    fun_fact: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    hobby_id: {
      type:DataTypes.INTEGER,
      references:{
        model:'hobby',
        key:'id',
      }

    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'placeholder.png',
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
