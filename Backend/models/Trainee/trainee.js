const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const Trainee = sequelize.define('trainee',{
    name: {type : DataTypes.STRING,allowNull: false},
    dateOfBirth: {type : DataTypes.DATEONLY},
    email: {type : DataTypes.STRING, allowNull: false},
    phoneNumber: {type : DataTypes.STRING, allowNull: false},
    qualification: {type : DataTypes.STRING},
    experience: {type : DataTypes.STRING},
    languagesKnown: {type : DataTypes.ARRAY(DataTypes.STRING)},

    status: {type: DataTypes.STRING},
    roleId: {type : DataTypes.INTEGER},
    password: {type : DataTypes.STRING, allowNull: false},

    trainingPeriod: {type : DataTypes.STRING},
    trainingMode: {type : DataTypes.STRING},
    startDate: {type : DataTypes.STRING},
    endDate: {type : DataTypes.STRING},
    traineeID: {type : DataTypes.STRING},
    
},
{
    freezeTableName: true
})

module.exports = Trainee;


