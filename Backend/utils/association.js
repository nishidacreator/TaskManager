const sequelize = require('./db');
const { JSON } = require('sequelize');
const bcrypt = require('bcrypt');

const Role = require('../models/User/role');
const User = require('../models/User/user');
const Attendance = require('../models/User/attendance');
const Trainee = require('../models/Trainee/trainee');
const Project = require('../models/Task/project');
const Task = require('../models/Task/task');  //projectId
const Client = require('../models/Task/client');
const DailyReport = require('../models/Task/dailyReport');
const UserLanguage = require('../models/User/userLanguage');
const Leave = require('../models/leave');
const UserExperience = require('../models/User/userExperience');
const Minutes = require('../models/minutes');
const MinuteDetails = require('../models/minuteDetails');
async function syncModel(){

    await sequelize.sync({force: true})

    //RELATION
    Role.hasMany(User,{foreignKey : 'roleId', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    User.belongsTo(Role)

    Role.hasMany(Trainee,{foreignKey : 'roleId', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    Trainee.belongsTo(Role,{foreignKey: 'roleId'})

    User.hasMany(Attendance,{foreignKey : 'userId', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    Attendance.belongsTo(User)

    Trainee.hasMany(Attendance,{foreignKey : 'traineeId', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    Attendance.belongsTo(Trainee)

    Project.hasOne(Task,{foreignKey: 'projectId'})
    Task.belongsTo(Project)




    Client.hasMany(Project,{foreignKey: 'clientId', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    Project.belongsTo(Client)


    

    Task.hasMany(DailyReport,{foreignKey: 'taskId'})
    DailyReport.belongsTo(Task)

    User.hasOne(Task,{foreignKey : 'assignedBy', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    Task .belongsTo(User, {as: 'by', foreignKey : 'assignedBy'})

    User.hasOne(Task,{foreignKey : 'assignedTo', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    Task .belongsTo(User, {as: 'user', foreignKey : 'assignedTo'})

    User.hasMany(UserLanguage, { foreignKey: 'userId' });
    UserLanguage.belongsTo(User, { foreignKey: 'userId' });

    User.hasOne(Leave,{foreignKey: 'userId'});
    Leave.belongsTo(User)

    Trainee.hasMany(Leave,{foreignKey : 'traineeId', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    Leave.belongsTo(Trainee)

    User.hasMany(UserExperience,{foreignKey : 'userId'})
    UserExperience.belongsTo(User)

    User.hasMany(UserExperience,{foreignKey : 'userId'})
    UserExperience.belongsTo(User)

    User.hasOne(Minutes,{foreignKey: 'userId'});
    Minutes.belongsTo(User)

    Project.hasOne(Minutes,{foreignKey: 'projectId'});
    Minutes.belongsTo(Project)

    // UserExperience.hasMany(Trainee,{foreignKey : 'traineeID'})
    // Trainee.belongsTo(UserExperience)
    
    // Minutes.hasMany(MinuteDetails,{foreignKey : 'minutesId'})
    // MinuteDetails.belongsTo(Minutes)

    //BULK CREATE
    const role = await Role.findAll({})
    if(role.length === 0){
        Role.bulkCreate([
            {roleName : 'Admin', status: true},
            {roleName : 'Employee', status: true},
            {roleName : 'Trainee', status: false}
        ])
    }

    const user = await User.findAll({})
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt)

    if(user.length === 0){
        User.bulkCreate([
            {name : 'Admin', phoneNumber: '1234567890', email: 'admin@gmail.com', password: hashedPassword, roleId: 1},
            {name : 'amina', phoneNumber: '1134567890', email: 'amina@gmail.com', password: hashedPassword, roleId: 2},
            {name : 'nishida', phoneNumber: '1114567890', email: 'nishida@gmail.com', password: hashedPassword, roleId: 2},
            {name : 'anu', phoneNumber: '1114567890', email: 'anu@gmail.com', password: hashedPassword, roleId: 2}
        ])
    }
    const client = await Client.findAll({})
    if(client.length === 0){
        Client.bulkCreate([
            {clientName : 'Shibin', email: "shibin@gmail.com", mob: 9847391646},
            {clientName : 'Hafiz', email: "hafiz@gmail.com", mob: 9857391646}
           
        ])
    }
    const project = await Project.findAll({})
    if(project.length === 0){
        Project.bulkCreate([
            {
                projectName:'INARA',
                clientId:2,
                description: 'Therapy center',
                startDate:'2023-12-09',
                endDate:'2023-12-09',
                deadline:'2023-12-09',
                frontend: 'Angular',
                backend: 'node js',
                database: 'postgres',
                status: 'on progress',
                remarks: 'Immediate'
            }, {
                projectName:'WAC',
                clientId:1,
                description: 'Airlines ERP',
                startDate:'2023-12-09',
                endDate:'2023-12-09',
                deadline:'2023-12-09',
                frontend: 'Angular',
                backend: 'node js',
                database: 'postgres',
                status: 'on progress',
                remarks: 'Immediate'
            },
          
        ])


    }
    const task = await Task.findAll({})
    if(task.length === 0){
        Task.bulkCreate([
            {
                projectId: 1,
                description: 'Admin module',
                assignedBy: 1,
                assignedTo:2,
                assignedOn:'2023-12-09',
                deadline:'2023-12-09',
                status: 'assigned' ,
                remarks: 'urgent'
            }
          
        ])


    }


}
module.exports = syncModel