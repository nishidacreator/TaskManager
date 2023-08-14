const express = require('express');
const Project = require('../../models/Task/project');
const router = express.Router();
const Client = require('../../models/Task/client');


router.post('/', async(req,res)=>{
  try{
    const { projectName,clientId, description, startDate, endDate, deadline,frontend, backend, database, status, remarks } = req.body;
    const newProject = new Project({
        projectName : projectName,
        clientId : clientId,
        description: description,
        startDate : startDate,
        endDate : endDate,
        deadline: deadline,
        frontend: frontend,
        backend: backend,
        database: database,
        status: status,
        remarks: remarks
    });
    await newProject.save();

res.send(newProject)
 
  }
  catch (error) {
    res.send({error : error.message});
}   
})


router.get('/', async(req,res)=>{
  try {
      const project = await Project.findAll({include: Client, order: ['id']});
      res.send(project);
      
  } catch (error) {
      res.send(error.message);
  }  
})

router.get('/:id', async(req,res)=>{
  try {
      const project = await Project.findOne({include: Client});
      res.send(project);
      
  } catch (error) {
      res.send(error.message);
  }  
})


router.patch('/:id', async(req,res)=>{
  try {
      Project.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Project was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
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

    const result = await Project.destroy({
        where: { id: req.params.id },
        force: true,
    });

    if (result === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Project with that ID not found",
        });
      }
  
      res.status(204).json();
    }  catch (error) {
    res.send({error: error.message})
}
  
})



module.exports = router;

