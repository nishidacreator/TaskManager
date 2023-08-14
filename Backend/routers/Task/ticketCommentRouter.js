const express = require('express');
const TicketComment = require('../../models/Task/ticketComment');
const router = express.Router();
// const authenticateToken = require('../middleware/authorization');

router.post('/',  async (req, res) => {
    try {
            const { commentedBy,comment,ticketId} = req.body;

            const ticketComment = new TicketComment({commentedBy,comment,ticketId});

            await ticketComment.save();

            res.send(ticketComment);

    } catch (error) {
        res.send(error);
    }
})


router.get('/',async(req,res)=>{

    try {
        const ticketComment = await TicketComment.findAll({});
        res.send(ticketComment);
        
    } catch (error) {
        res.send(error.message);
    }  
})

router.get('/:id', async(req,res)=>{
    try {
        console.log(req.params.id)
        const ticketComment = await TicketComment.findOne({where:{id:req.params.id}})
        res.send(ticketComment)       
    } catch (error) {
        res.send(error)
    }
})



router.delete('/:id', async(req,res)=>{
    try {

        const result = await TicketComment.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "TicketComment with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {
        TicketComment.update(req.body, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "TicketComment was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update TicketComment with id=${id}. Maybe TicketComment was not found or req.body is empty!`
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