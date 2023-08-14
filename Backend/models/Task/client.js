const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../utils/db')


const Client = sequelize.define('client',
{
    clientName: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    mob:{type: DataTypes.STRING}
  
   
},

{
    freezeTableName:true
});


module.exports = Client