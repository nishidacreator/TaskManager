const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const TraineeLanguage = sequelize.define('traineeLanguage',{
    traineeId : { type : DataTypes.INTEGER, allowNull: false},
    language : {type : DataTypes.STRING, allowNull : false},
    yearOfExperience : {type : DataTypes.FLOAT}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = TraineeLanguage;


