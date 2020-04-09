const { Model, DataTypes } = require('sequelize');
const uuid = require('uuid');

class Group extends Model {}

exports.initGroup = (sequelize) => {
  Group.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
    },
  }, { sequelize, modelName: 'group' });
}

exports.default = Group;
