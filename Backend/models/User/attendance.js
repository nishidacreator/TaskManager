const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const Attendance = sequelize.define('attendance',{
    userId : {type : DataTypes.INTEGER, allowNull : true},
    dateTime : {type : DataTypes.DATE, allowNull : false},
    type : {type : DataTypes.STRING},
    // totalHours : {type : DataTypes.FLOAT},
    traineeId : {type : DataTypes.INTEGER, allowNull : true}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = Attendance;


