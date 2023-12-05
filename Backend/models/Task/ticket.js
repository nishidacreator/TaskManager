const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const Ticket = sequelize.define('ticket',{
    title: { type : DataTypes.STRING, allowNull: false},
    description: {type : DataTypes.STRING },
    file: {type : DataTypes.STRING }, // File path will be stored 
    taskId: {type : DataTypes.INTEGER, allowNull: false},
    userId:{type:DataTypes.INTEGER, allowNull:true},
    traineeId:{type:DataTypes.INTEGER, allowNull:true},
    ticketNo: {type : DataTypes.STRING},
    status: {type : DataTypes.STRING},
    taskcompleted: {type : DataTypes.STRING},
    completionComment: {type : DataTypes.STRING}

},
{
    freezeTableName: true
})

console.log(Ticket === sequelize.models.ticket);

module.exports = Ticket;


