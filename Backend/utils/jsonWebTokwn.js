const jwt = require('jsonwebtoken');

function jwtTokens({id,name,email,role}){
    const user = {id,name,email,role};
    // console.log(user);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2d'});
    console.log(refreshToken);
    return({accessToken, refreshToken});    
}

module.exports = jwtTokens;