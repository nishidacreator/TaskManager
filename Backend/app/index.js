const express = require('express')
// const dotenv = require('dotenv')
const cors = require('cors');

const syncModel = require('../utils/association');

const sequelize = require('../utils/db');
require('dotenv').config();

const multer = require('multer');

//middleware
const app = express();

app.use(express.json());

app.use(cors({orgin:'*'}))

syncModel()

const Role = require('../routers/User/role');
app.use('/role', Role);

const Reg = require('../routers/User/register');
app.use('/register', Reg);

const UserLanguage = require('../routers/User/userLanguage');
app.use('/language', UserLanguage);

const UserExperience = require('../routers/User/userExperience');
app.use('/experience', UserExperience);

const Login = require('../routers/User/login');
app.use('/login', Login);

const trainee = require('../routers/Trainee/traineeRouter')
app.use('/trainee', trainee);

const TraineeLanguage = require('../routers/Trainee/traineeLanguages');
app.use('/traineelanguage', TraineeLanguage);

const TraineeExperience = require('../routers/Trainee/traineeExperiences');
app.use('/traineeexperience', TraineeExperience);

const leave = require('../routers/leaveRouter')
app.use('/leave', leave);

const Attendance = require('../routers/User/attendance')
app.use('/attendance', Attendance);

const ticketRoutes = require('../routers/Task/ticketRouter');
app.use('/tickets', ticketRoutes);

const task = require('../routers/Task/taskRouter');
app.use('/task',task)

const project = require('../routers/Task/projectRouter');
app.use('/project', project)

const client = require('../routers/Task/clientRouter');
app.use('/clients', client)

const dailyReport = require('../routers/Task/dailyReportRouter');
app.use('/dailyReport', dailyReport)

const minutes = require('../routers/minutes')
app.use('/minutes',minutes)

const minutesDetails = require('../routers/minutesDetails.js')
app.use('/minutesDetails',minutesDetails)

const ticketComment = require('../routers/Task/ticketCommentRouter')
app.use('/ticketComment',ticketComment)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
