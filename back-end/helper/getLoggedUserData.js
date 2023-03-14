const jwt = require("jsonwebtoken");
const {loginModel} = require("../model/loginModel")

async function getLoggedUserData(token){
    const verify_jwt = jwt.verify(token, process.env.TOKEN_SECRET);

    if(!verify_jwt || !verify_jwt.email)return {error:1};
    const loggedUserData = await loginModel.findOne({email: verify_jwt.email});
    return {
        username: loggedUserData.username,
        email:loggedUserData.email,
        fullname : loggedUserData.fullname
    };
}

module.exports = getLoggedUserData;