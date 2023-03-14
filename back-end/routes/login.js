const express = require("express");
let router = express.Router();
const {loginModel} = require("../model/loginModel")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/",async(req,res)=>{
    const reqBody = {
        email : req.body.email,
        password: req.body.password
    }
    try {
        const response =  await loginModel.findOne({email : reqBody.email})
        if(response && (await bcrypt.compare(reqBody.password,response.password))){
            const token = jwt.sign({ email: reqBody.email }, process.env.TOKEN_SECRET, {
                expiresIn: "7d",
              });
              const verify_jwt = jwt.verify(token, process.env.TOKEN_SECRET);
              res
                .cookie("secret", token, {
                })
                .cookie("LoginEmail", reqBody.email,{
                })
                .json({ logged: 1 });
        }else {
            res.json({ logged: 0 });
          }
    } catch (error) {
        console.log(error);
    }
   
})

module.exports = router;
