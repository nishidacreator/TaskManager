const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Ticket = require('../../models/Task/ticket');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname; 
    cb(null, originalName);
 
  },
});

const upload = multer({ storage });


router.post('/create', upload.single('file'), async (req, res) => {
  try {
    const { title, description, taskId, userId, ticketNo, status, traineeId } = req.body;
    const file = req.file ? req.file.path : null;

    const ticket = new Ticket({
      title,
      description,
      file,
      taskId,
      userId,
      ticketNo,
      status, 
      traineeId, 
    });

    await ticket.save();
    res.status(201).json({ message: 'Ticket created successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async(req,res)=>{
  try {
      
      const task = await Ticket.findOne ( {where : { id:req.params.id}})
      res.send(task)   
      
  } catch (error) {
      res.send(error)
  }
})
router.get('/',async(req,res)=>{

    try {
        const ticket = await Ticket.findAll({});
        res.send(ticket);
        
    } catch (error) {
        res.send(error.message);
    }  
})


router.patch('/:id', async(req,res)=>{
  try {
    Ticket.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Ticket was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body is empty!`
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
      const ticket = await Ticket.destroy({where: {id:req.params.id}})
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
     console.log(data)
    Ticket.update(data, {
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



router.patch('/updateTicketCompltComment/:id', async(req,res)=>{
  try {
    console.log('IDASDFG', req.params.id)
    console.log('rqbody', req.body)

    const body = {
      taskcompleted : req.body.taskcompleted,
      completionComment : req.body.completionComment,
    }

    Ticket.update(body, {
          where: { id: req.params.id }
        })

          .then(num => {
            if (num == 1) {
              res.send({
                message: "Ticket was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body is empty!`
              });
            }
          })
 

    // await tk.save()
    // res.send(tk);
    } catch (error) {
      console.error('Error updating ticket:', error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
})
module.exports = router;
