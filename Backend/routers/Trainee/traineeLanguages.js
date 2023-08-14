const express = require('express');
const TraineeLanguage = require('../../models/Trainee/traineeLanguages');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
          const {languages} = req.body;

          const result = await TraineeLanguage.bulkCreate(languages)

          await result.save();

          res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const result = await TraineeLanguage.findAll({ order:['id']})

    res.send(result);
})

router.get('/:id', async (req, res) => {

  const result = await TraineeLanguage.findOne({where: {id: req.params.id}, order:['id']})

  res.send(result);
})

router.get('/byuser/:id', async (req, res) => {

  const result = await TraineeLanguage.findAll({where: {traineeId: req.params.id}, order:['id']})

  res.send(result);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await TraineeLanguage.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "TraineeLanguage with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {
        TraineeLanguage.update(req.body, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Language was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Language with id=${id}. Maybe Language was not found or req.body is empty!`
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