const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const UserExperience = sequelize.define('userExperience',{
    userId : { type : DataTypes.INTEGER, allowNull: false },
    experience : {type : DataTypes.STRING, allowNull : false},
    yearOfExperience : {type : DataTypes.FLOAT}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = UserExperience;


