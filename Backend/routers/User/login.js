const express = require('express');
const router = express.Router();
const User = require('../../models/User/user');
const bcrypt = require('bcrypt');
const jwtTokens = require('../../utils/jsonWebTokwn');
const Trainee = require('../../models/Trainee/trainee')


router.post('/', async(req, res)=> {
    try {
        const { email, password } = req.body;
        console.log(password)

        const user = await User.findOne({where: { email: email }});
        if(!user){
            const trainee = await Trainee.findOne({ where: { email: email, status: 'Joined' } });

            if(!trainee){
                return res.status(404).send({ message: 'User not found' });
            }  
            // console.log(trainee)  
            const validPassword = await bcrypt.compare(password, trainee.password);
            console.log(trainee.password)
            console.log(password)        

            if(!validPassword){
                return res.status(401).send({ message: 'incorrect password' });
            }
    
            let userToken = {id:trainee.id, name:trainee.name, email: trainee.email};
            let token = jwtTokens(userToken);
        console.log(token);

            res.cookie('refreshtoken', token.refreshToken, {httpOnly : true})

            return res.status(200).send({"token" : token, "role": trainee.roleId, "name" : trainee.name, "id" : trainee.id});
        }
        

        const validPassword = await bcrypt.compare(password, user.password);
        console.log(user.password)
        console.log(password)


        if(!validPassword){
            return res.status(401).send({ message: 'incorrect password' });
        }

        let userToken = {id:user.id, name:user.name, email: user.email, role: user.roleId};
        // console.log(userToken);

        let token = jwtTokens(userToken);
        // console.log(token);

        res.cookie('refreshtoken', token.refreshToken, {httpOnly : true})

        return res.status(200).send({"token" : token, "role": user.roleId, "name" : user.name, "id" : user.id});

    } catch (error) {
        res.send(error);
    }    
})


module.exports = router;