const express = require('express');
const Trainee = require('../../models/Trainee/trainee')
const router = express.Router();
const bcrypt = require('bcrypt');
const Role = require('../../models/User/role');
const authToken = require('../../middleware/authorization');
const TraineeExperience = require('../../models/Trainee/traineeExperiences');
const TraineeLanguages = require('../../models/Trainee/traineeLanguages');

router.post('/',  async (req, res) => {
    try {
            const { name,email,phoneNumber,qualification,experience,languagesKnown,trainingPeriod,trainingMode,
                startDate,endDate,traineeID, status, password, roleId, dateOfBirth, traineeExperiences, traineeLanguages} = req.body;

                const user = await Trainee.findOne({where: {phoneNumber: phoneNumber}});

                if (user) {
                    return res.status(400).send({ message: 'User already exists in this phone number' })  
                }
        
                const userEmail = await Trainee.findOne({where: {email: email}});
                if (userEmail) {
                    return res.status(400).send({ message: 'Email is already registered' })  
                }

                // const salt = await bcrypt.genSalt(10);
                const passw = await bcrypt.hash(password, 10);


            const result = new Trainee({name,email,phoneNumber,qualification,experience,languagesKnown,trainingPeriod,trainingMode,
                startDate,endDate,traineeID, status, password: passw, roleId, dateOfBirth});

                
            await result.save();

            const userId = result.id
            for(i = 0; i <traineeLanguages.length; i++) {
              traineeLanguages[i].traineeId = userId
            }
            const resultLang = await TraineeLanguages.bulkCreate(traineeLanguages)
            res.send(resultLang)

            for(j = 0; j < traineeExperiences.length; j++) {
              traineeExperiences[j].traineeId = userId
              console.log(traineeExperiences[j])
            }

            console.log(traineeExperiences)
            const resultEx = await TraineeExperience.bulkCreate(traineeExperiences)


    } catch (error) {
        res.send(error);
    }
})


router.get('/',async(req,res)=>{

    try {
        const result = await Trainee.findAll({include: Role, order: ['id']});
        res.send(result);
        
    } catch (error) {
        res.send(error.message);
    }  
})

router.get('/:id',  async(req,res)=>{
    try {
        console.log(req.params.id)
        const result = await Trainee.findOne({
          include: Role,
          where:{id:req.params.id}})
        res.send(result)       
    } catch (error) {
        res.send(error)
    }
})

router.patch('/:id',  async(req,res)=>{
    try {
        const { name,email,phoneNumber,qualification,experience,languagesKnown,trainingPeriod,trainingMode,
          startDate,endDate,traineeID, status, password, roleId, dateOfBirth} = req.body;

          const pass = await bcrypt.hash(password, 10);

        const trainee = {name,email,phoneNumber,qualification,experience,languagesKnown,trainingPeriod,trainingMode,
          startDate,endDate,traineeID, status, password: pass, roleId, dateOfBirth}

        Trainee.update(trainee, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Trainee was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Trainee with id=${id}. Maybe Trainee was not found or req.body is empty!`
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

router.patch('/status/:id',  async(req,res)=>{
  try {
    const trainee = {
        traineeID: req.body.traineeID,
        trainingPeriod: req.body.trainingPeriod,
        trainingMode: req.body.trainingMode,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }
      Trainee.update(trainee, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Trainee Status was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Trainee with id=${id}. Maybe Trainee was not found or req.body is empty!`
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

router.delete('/:id', async(req,res)=>{
  try {

      const result = await Trainee.destroy({
          where: { id: req.params.id },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Trainee with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send({error: error.message})
  }
  
})


module.exports = router;