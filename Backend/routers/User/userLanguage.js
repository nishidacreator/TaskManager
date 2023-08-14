const express = require('express');
const UserLanguage = require('../../models/User/userLanguage');
const User = require('../../models/User/user');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
          const {languages} = req.body;

          const result = await UserLanguage.bulkCreate(languages)

          await result.save();

          res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', async (req, res) => {

    const result = await UserLanguage.findAll({include:  User, order:['id']})

    res.send(result);
})

router.get('/:id', async (req, res) => {

  const result = await UserLanguage.findOne({
    include:  User, 
    where: {id: req.params.id}, 
    order:['id']})

  res.send(result);
})

router.get('/byuser/:id', async (req, res) => {

  const result = await UserLanguage.findAll({where: {userId: req.params.id}, order:['id']})

  res.send(result);
})

router.delete('/:id', async(req,res)=>{
    try {

        const result = await UserLanguage.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "UserLanguage with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send({error: error.message})
    }
    
})

router.patch('/:id', async(req,res)=>{
    try {
        UserLanguage.update(req.body, {
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