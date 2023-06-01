const jwt = require("jsonwebtoken");
const {loginModel} = require("../model/loginModel")

async function getLoggedUserData(token){
    try {
        const verify_jwt = jwt.verify(token, process.env.TOKEN_SECRET);
    
        if(!verify_jwt || !verify_jwt.email)return {error:1};
        const loggedUserData = await loginModel.findOne({email: verify_jwt.email});
        return {
            username: loggedUserData?.username,//if loggedUserData is not undefined then only read .username
            email:loggedUserData?.email,
            fullname : loggedUserData?.fullname,
            userid : loggedUserData?.uuid
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = getLoggedUserData;