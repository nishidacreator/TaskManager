const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const UserLanguage = sequelize.define('userLanguage',{
    userId : { type : DataTypes.INTEGER, allowNull: false },
    language : {type : DataTypes.STRING, allowNull : false},
    yearOfExperience : {type : DataTypes.FLOAT}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = UserLanguage;


