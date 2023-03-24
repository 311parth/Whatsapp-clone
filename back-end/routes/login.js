const express = require("express");
let router = express.Router();
const {loginModel} = require("../model/loginModel")

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



router.post("/isauthenticated",verifyAuthToken,(req,res)=>{
   res.json({"isauthenticated" : 1});
})


module.exports = router;
