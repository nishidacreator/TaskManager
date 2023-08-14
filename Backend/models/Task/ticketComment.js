const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const TicketComment = sequelize.define('ticketComment',{
    ticketId:{type:DataTypes.INTEGER},
    commentedBy: {type : DataTypes.STRING},
    comment: {type : DataTypes.STRING},

    // status : {type : DataTypes.BOOLEAN, defaultValue : true}
},
{
    freezeTableName: true
})

console.log(TicketComment === sequelize.models.ticketComment);

module.exports = TicketComment;


