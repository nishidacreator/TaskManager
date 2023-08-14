const express = require('express');
const Task = require('../../models/Task/task');
const Project = require('../../models/Task/project');
const DailyReport = require('../../models/Task/dailyReport');
const router = express.Router();

router.post('/', async(req,res)=>{
  try{
    const { taskId, description, status, date } = req.body;
    const newDailyReport = new DailyReport({
        taskId: taskId,
        description : description,
        status: status,
        date: date
    });
    await newDailyReport.save();

res.send(newDailyReport)
 
  }
  catch (error) {
    res.send({error : error.message});
}   
})


router.get('/', async(req,res)=>{
  try {
      const dailyReport = await DailyReport.findAll({include: Task});
      res.send(dailyReport);
      
  } catch (error) {
      res.send(error.message);
  }  
})


router.get('/:id', async(req,res)=>{
  try {
      
      const dailyReport = await DailyReport.findOne ( {where : { id:req.params.id}})
      res.send(dailyReport)   
      
  } catch (error) {
      res.send(error)
  }
})


router.patch('/:id', async(req,res)=>{
  try {
      DailyReport.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Daily report was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update daily report with id=${id}. Maybe Daily report was not found or req.body is empty!`
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
      const dailyReport = await DailyReport.destroy({where: {id:req.params.id}})
      res.send({
        message: "Deleted successfully."
      });
  } catch (error) {
      res.send(error)
  }
  
})


module.exports = router;

