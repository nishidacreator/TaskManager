const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db')


const DailyReport = sequelize.define('dailyReport',
{ 
    taskId: {type: DataTypes.INTEGER},
    description: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE} 
},

{
    freezeTableName:true
});


module.exports = DailyReport