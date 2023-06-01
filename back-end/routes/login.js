const express = require("express");
let router = express.Router();
const {loginModel} = require("../model/loginModel")
const getLoggedUserData = require("../helper/getLoggedUserData")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyAuthToken = require("../helper/verifyAuthToken")
router.post("/",async(req,res)=>{
    const reqBody = {
        email : req.body.email,
        password: req.body.password
    }
    try {
        const response =  await loginModel.findOne({email : reqBody.email})
        if(response && (await bcrypt.compare(reqBody.password,response.password))){
            const token = jwt.sign({ email: reqBody.email }, process.env.TOKEN_SECRET, {
                expiresIn: "1d",
              });
            res.json({
                logged : 1,
                authToken : token,
                username: response.username,
                userid:response.uuid
            })
        }else {
            res.json({ logged: 0 });
          }
    } catch (error) {
        console.log(error);
    }
   
})



router.post("/isauthenticated",async(req,res)=>{
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const LoggedUserData = await getLoggedUserData(req.headers.authorization.split(' ')[1]); 
        if(!LoggedUserData || !LoggedUserData.username || !LoggedUserData.userid){
            res.json({isAuthenticated : 0});
            return;
        }
        res.json({
            isAuthenticated : 1,
            username: LoggedUserData.username,
            userid: LoggedUserData.userid
        })
    }else{
        res.json({
            isAuthenticated : 0,
        })
    }

})


module.exports = router;
