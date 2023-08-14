const express = require('express');
const Leave = require('../models/leave');
const router = express.Router();
// const authenticateToken = require('../middleware/authorization');
const User = require('../models/User/user');
const Trainee = require('../models/Trainee/trainee');

router.post('/',  async (req, res) => {
    try {
            const { reason, userId, fromDate, toDate, status, leaveType, traineeId} = req.body;

            const leave = new Leave({reason,userId,fromDate,toDate,status, leaveType, traineeId});

            await leave.save();

            res.send(leave);

    } catch (error) {
        res.send(error);
    }
})


router.get('/',async(req,res)=>{

    try {
        const leave = await Leave.findAll({include: [User, Trainee]});
        res.send(leave);
        
    } catch (error) {
        res.send(error.message);
    }  
})

router.get('/:id', async(req,res)=>{
    try {
        console.log(req.params.id)
        const leave = await Leave.findOne({where:{id:req.params.id}})
        res.send(leave)       
    } catch (error) {
        res.send(error)
    }
})

router.patch('/:id', async(req,res)=>{
    try {
        Leave.update(req.body, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Leave was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Leave with id=${id}. Maybe Leave was not found or req.body is empty!`
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
      const leave = await Leave.destroy({where: {id:req.params.id}})
      res.send({
        message: "Deleted successfully."
      });
  } catch (error) {
      res.send(error)
  }
  
})





module.exports = router;