const express = require('express');
const MinuteDetails = require('../models/minuteDetails');
const router = express.Router();
// const authenticateToken = require('../middleware/authorization');
const User = require('../models/User/user');
const Minutes = require('../models/minutes');

router.post('/',  async (req, res) => {
    try {
            const { minutesId, description, status, remarks, updatedOn} = req.body;

            const result = new MinuteDetails({minutesId, description, status, remarks, updatedOn});

            await result.save();

            res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/:id',async(req,res)=>{

  try {
      const result = await MinuteDetails.findAll({
        where: {minutesId: req.params.id}
      });
      res.send(result);
      
  } catch (error) {
      res.send(error.message);
  }  
})

router.get('/byid/:id',async(req,res)=>{
  try {
      const result = await MinuteDetails.findOne({
        where: {id: req.params.id}
      });
      res.send(result);
      
  } catch (error) {
      res.send(error.message);
  }  
})


router.get('/',async(req,res)=>{

    try {
        const result = await MinuteDetails.findAll({});
        res.send(result);
        
    } catch (error) {
        res.send(error.message);
    }  
})

router.get('/:id', async(req,res)=>{
    try {
        console.log(req.params.id)
        const result = await MinuteDetails.findOne({where:{id:req.params.id}})
        res.send(result)       
    } catch (error) {
        res.send(error)
    }
})

router.patch('/:id', async(req,res)=>{
    try {
        MinuteDetails.update(req.body, {
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
      const result = await MinuteDetails.destroy({where: {id: req.params.id}})
      res.send({
        message: "Deleted successfully."
      });
  } catch (error) {
      res.send(error)
  }
  
})

module.exports = router;