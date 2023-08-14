const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../utils/db')

const User = sequelize.define('user', {
  // Model attributes are defined here
  name: {type: DataTypes.STRING, allowNull : false},
  phoneNumber: {type: DataTypes.STRING, allowNull : false},
  email: {type: DataTypes.STRING, allowNull : false},
  password: {type: DataTypes.STRING, allowNull : false},
  roleId: {type: DataTypes.INTEGER, allowNull : false},
  status: {type: DataTypes.BOOLEAN, allowNull : false},
  qualification: {type: DataTypes.STRING},
  joiningDate: {type: DataTypes.DATEONLY, default: new Date},
  employeeId: {type: DataTypes.STRING, allowNull :false},
  dateOfBirth: {type: DataTypes.DATEONLY}
},
{
  freezeTableName: true
});

module.exports = User