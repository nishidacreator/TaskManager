const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Leave = sequelize.define('leave',{
    reason: {type : DataTypes.STRING, allowNull: false},
    userId: {type : DataTypes.INTEGER},
    traineeId: {type : DataTypes.INTEGER},
    fromDate: {type : DataTypes.DATEONLY, allowNull: false},
    toDate: {type : DataTypes.DATEONLY, allowNull: false},
    status: {type : DataTypes.STRING, allowNull: false},
    leaveType: {type : DataTypes.STRING}    
},
{
    freezeTableName: true
})


module.exports = Leave;


