const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const Attendance = sequelize.define('attendance',{
    userId : {type : DataTypes.INTEGER, allowNull : true},
    type : {type : DataTypes.STRING},
    dateTime : {type : DataTypes.DATE, allowNull : false},
    traineeId : {type : DataTypes.INTEGER, allowNull : true}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = Attendance;


