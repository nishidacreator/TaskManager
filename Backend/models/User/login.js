const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const AttendanceLog = sequelize.define('attendanceLog',{
    attendanceId : {type : DataTypes.INTEGER, allowNull : true},
    type : {type : DataTypes.BOOLEAN },
    time : {type : DataTypes.TIME}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = AttendanceLog;


