const express = require('express');
const Minute = require('../models/minutes');
const router = express.Router();
// const authenticateToken = require('../middleware/authorization');
const User = require('../models/User/user');
const MinuteDetails = require('../models/minuteDetails');
const Project = require('../models/Task/project');

router.post('/',  async (req, res) => {
    try {
            const { projectId, date, atendees, time, minutes, agenda, userId, minuteDetails} = req.body;

            const result = new Minute({projectId, date, atendees, time, minutes, agenda, userId, minuteDetails});

            await result.save();

            const minuteId = result.id
            console.log(minuteDetails);
            for(i=0; i<minuteDetails.length; i++) {
                minuteDetails[i].minutesId = minuteId
                console.log(minuteDetails[i]);
            }
            console.log(minuteDetails)

            const minuteDet = await MinuteDetails.bulkCreate(minuteDetails)
            console.log(minuteDet)
            res.send(result);

    } catch (error) {
        res.send(error);
    }
})


router.get('/',async(req,res)=>{

    try {
        const result = await Minute.findAll({include: [User, Project]});
        res.send(result);
        
    } catch (error) {
        res.send(error.message);
    }  
})

router.get('/:id', async(req,res)=>{
    try {
        console.log(req.params.id)
        const result = await Minute.findOne({
          where:{id:req.params.id},
          include: [Project, User]
        })
        res.send(result)       
    } catch (error) {
        res.send(error)
    }
})

router.patch('/:id', async(req,res)=>{
    try {
        Minute.update(req.body, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Minute was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Minute with id=${id}. Maybe Minute was not found or req.body is empty!`
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
      const id = req.params.id;
      const leave = await Minute.destroy({where: {id:req.params.id}})
      res.send({
        message: "Deleted successfully."
      });
  } catch (error) {
      res.send(error)
  }
  
})





module.exports = router;