const express = require('express');
const Task = require('../../models/Task/task');
const Project = require('../../models/Task/project');
const Trainee = require('../../models/Trainee/trainee');
const router = express.Router();

router.post('/', async(req,res)=>{
  try{
    const { projectId, description, assignedBy, assignedTo, assignedOn, deadline, status, remarks } = req.body;
    const newTask = new Task({
        projectId: projectId,
        description : description,
        assignedBy: assignedBy,
        assignedTo : assignedTo,
        assignedOn: assignedOn,
        deadline : deadline,
        status: status,
        remarks:remarks
    });
    await newTask.save();

res.send(newTask)
 
  }
  catch (error) {
    res.send({error : error.message});
}   
})


router.get('/', async(req,res)=>{
  try {
      const task = await Task.findAll({include: [Project, 'by', 'user'] });
      res.send(task);
      
  } catch (error) {
      res.send(error.message);
  }  
})


router.get('/:id', async(req,res)=>{
  try {
      
      const task = await Task.findOne ( {where : { id:req.params.id}})
      res.send(task)   
      
  } catch (error) {
      res.send(error)
  }
})


router.patch('/:id', async(req,res)=>{
  try {
      Task.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Task was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
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
      const task = await Task.destroy({where: {id:req.params.id}})
      res.send({
        message: "Deleted successfully."
      });
  } catch (error) {
      res.send(error)
  }
  
})



router.patch('/statusupdate/:id', async(req,res)=>{
  try {
     const data = {status:req.body.status}
      Task.update(data, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Task was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
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

