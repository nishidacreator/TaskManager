const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db')


const Task = sequelize.define('task',
{ 
    projectId: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING},
    assignedBy: {type: DataTypes.INTEGER, allowNull: false},
    assignedTo:{type: DataTypes.INTEGER, allowNull: true},
    assignedOn:{type: DataTypes.DATEONLY, allowNull: false},
    deadline:{type: DataTypes.DATEONLY, allowNull: false},
    status: {type: DataTypes.STRING} ,
    remarks: {type: DataTypes.STRING},
    traineeId: {type: DataTypes.INTEGER, allowNull: true}
},

{
    freezeTableName:true
});


module.exports = Task