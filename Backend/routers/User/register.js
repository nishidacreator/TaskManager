const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User/user');
const router = express.Router();
// const authenticateToken = require('../../middleware/authorization');
const Role = require('../../models/User/role');
const UserLanguage = require('../../models/User/userLanguage');
const UserExperience = require('../../models/User/userExperience');

router.post('/', async (req, res) => {
    try {
        const { name, phoneNumber, email, password, roleId, status, qualification, joiningDate, employeeId, userExperiences, userLanguages, dateOfBirth } = req.body;

        const user = await User.findOne({where: {phoneNumber: phoneNumber}});

        if (user) {
            return res.status(400).send({ message: 'User already exists in this phone number' })  
        }

        const userEmail = await User.findOne({where: {email: email}});
        if (userEmail) {
            return res.status(400).send({ message: 'Email is already registered' })  
        }

        const pass = await bcrypt.hash(password, 10);

        const newUser = new User({
            name : name, 
            phoneNumber : phoneNumber, 
            password : pass, 
            roleId : roleId, 
            status : status,
            qualification : qualification,
            joiningDate : joiningDate,
            employeeId : employeeId,
            email : email,
            dateOfBirth : dateOfBirth
            // userLanguages: userLanguages,
            // userExperiences: userExperiences
        });

        await newUser.save();
        console.log(newUser)
        
        const userId = newUser.id;
        console.log(userId)

        for(i = 0; i < userLanguages.length; i++) {
          userLanguages[i].userId = userId
        }
        const result = await UserLanguage.bulkCreate(userLanguages)


        for(j = 0; j < userExperiences.length; j++) {
          userExperiences[j].userId = userId
        }
        const resultEx = await UserExperience.bulkCreate(userExperiences)

        res.send(result)

        // res.status(200).send({id:newUser.id, name:newUser.name, email:newUser.email});
        } catch (error) {
            res.send({error : error.message});
        }   
})

router.get('/', async(req,res)=>{
    try {
        const user = await User.findAll({include : Role, order:['id']});
        res.send(user);
        
    } catch (error) {
        res.send(error.message);
    }  
})

router.get('/:id', async(req,res)=>{
  try {
      const user = await User.findOne({
        where: {id: req.params.id},
        include : Role
      });
      res.send(user);
      
  } catch (error) {
      res.send(error.message);
  }  
})


router.delete('/:id', async(req,res)=>{
    try {

        const result = await User.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "User with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
  const pass = await bcrypt.hash(req.body.password, 10);

    try {
        const user = {
          name : req.body.name,
          email : req.body.email,
          phoneNumber : req.body.phoneNumber,
          password : pass,
          roleId : req.body.roleId,
          status: req.body.status,
          qualification : req.body.qualification,
          joiningDate : req.body.joiningDate,
          dateOfBirth : req.body.dateOfBirth
        }

        User.update(user, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "User was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
              }
            })
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
})
module.exports = router;
 