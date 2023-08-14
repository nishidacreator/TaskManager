const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db')


const Minutes = sequelize.define('minutes',
{
    projectId: {type: DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATEONLY},
    time: {type: DataTypes.TIME},
    atendees: {type: DataTypes.ARRAY(DataTypes.STRING)},
    minutes: {type: DataTypes.STRING},
    agenda: {type: DataTypes.STRING},
    userId:{type: DataTypes.INTEGER, allowNull: false},
},

{
    freezeTableName:true
});


module.exports = Minutes