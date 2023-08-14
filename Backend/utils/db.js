const {Sequelize} = require('sequelize')


const sequelize = new Sequelize('task_db', 'task', 'task', {
    host: 'localhost',
    dialect: 'postgres' 
});

  
module.exports = sequelize