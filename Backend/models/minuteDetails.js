const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db')


const MinuteDetails = sequelize.define('minuteDetails',
{
    minutesId: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    remarks: {type: DataTypes.STRING},
    updatedOn: {type: DataTypes.DATEONLY}
},

{
    freezeTableName:true
});


module.exports = MinuteDetails