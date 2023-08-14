const express = require('express');
const UserExperience = require('../../models/User/userExperience');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
          const {experiences} = req.body;

          const result = await UserExperience.bulkCreate(experiences)

          await result.save();

          res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const result = await UserExperience.findAll({ order:['id']})

    res.send(result);
})

router.get('/:id', async (req, res) => {

  const result = await UserExperience.findOne({where: {id: req.params.id}, order:['id']})

  res.send(result);
})


router.get('/byuser/:id', async (req, res) => {

  const result = await UserExperience.findAll({where: {userId: req.params.id}, order:['id']})

  res.send(result);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await UserExperience.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Role with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {
        UserExperience.update(req.body, {
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