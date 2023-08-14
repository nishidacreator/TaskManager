const express = require('express');
const Client = require('../../models/Task/client');
const router = express.Router();

router.post('/', async(req,res)=>{
  try{
    const { clientName, mob, email } = req.body;
    const newClient = new Client({
        clientName: clientName,
        mob : mob,
        email: email
    });
    await newClient.save();

res.send(newClient)
 
  }
  catch (error) {
    res.send({error : error.message});
}   
})


router.get('/', async(req,res)=>{
  try {
      const client = await Client.findAll();
      res.send(client);
      
  } catch (error) {
      res.send(error.message);
  }  
})

router.get('/:id', async(req,res)=>{
  try {
      
      const client = await Client.findOne ( {where : { id:req.params.id}})
      res.send(client)   
      
  } catch (error) {
      res.send(error)
  }
})

router.patch('/:id', async(req,res)=>{
  try {
      Client.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Client was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
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

      const result = await Client.destroy({
          where: { id: req.params.id },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Client with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send({error: error.message})
  }
  
})


module.exports = router;

