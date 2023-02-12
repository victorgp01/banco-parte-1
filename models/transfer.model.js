const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Transfer = db.define('trasfer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  reciverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;
