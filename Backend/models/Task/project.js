const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db')


const Project = sequelize.define('project',
{
    projectName: {type: DataTypes.STRING},
    clientId:{type: DataTypes.INTEGER},
    description: {type: DataTypes.STRING},
    startDate: {type: DataTypes.DATEONLY},
    endDate:{type: DataTypes.DATEONLY},
    deadline:{type: DataTypes.DATEONLY},
    frontend: {type: DataTypes.STRING},
    backend: {type: DataTypes.STRING},
    database: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    remarks: {type: DataTypes.STRING}
},

{
    freezeTableName:true
});


module.exports = Project