const { Model, DataTypes } = require('sequelize');
const uuid = require('uuid');

class Student extends Model {}

exports.initStudent = (sequelize) => {
  Student.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(30),
    },
    lastName: {
      type: DataTypes.STRING(30),
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, { sequelize, modelName: 'student' });
}

exports.default = Student;
