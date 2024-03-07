const express = require('express');
const Attendance = require('../../models/User/attendance');
const router = express.Router();
const User = require('../../models/User/user');
const Trainee = require('../../models/Trainee/trainee');

router.post('/', async (req, res) => {
    try {
            const { userId, type, dateTime} = req.body;

            const result = new Attendance({userId, type, dateTime});

            await result.save();

            res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const result = await Attendance.findAll({ include: [User, Trainee], order:['id']})

    res.send(result);
})

router.get('/:id', async (req, res) => {

  const result = await result.findOne({where: {id: req.params.id}})

  res.send(result);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await Attendance.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Attendance with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

// router.patch('/:id', async(req,res)=>{
//     try {
//         Attendance.update(req.body, {
//             where: { id: req.params.id , date: req.body.date}
//           })
//             .then(num => {
//               if (num == 1) {
//                 res.send({
//                   message: "Attendance was updated successfully."
//                 });
//               } else {
//                 res.send({
//                   message: `Cannot update Attendance with id=${id}. Maybe Attendance was not found or req.body is empty!`
//                 });
//               }
//             })
//       } catch (error) {
//         res.status(500).json({
//           status: "error",
//           message: error.message,
//         });
//       }
// })
module.exports = router;