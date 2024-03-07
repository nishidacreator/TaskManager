const jwt = require('jsonwebtoken');
let ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "TASKMANAGE@2023";
let REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "TASKMANAGE@2023";

function jwtTokens({id,name,email,role}){
    const user = {id,name,email,role};
    // console.log(user);
    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
    const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {expiresIn: '2d'});
    console.log(refreshToken);
    return({accessToken, refreshToken});    
}

module.exports = jwtTokens;