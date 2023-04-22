const express = require("express");
let router = express.Router();
const {loginModel} = require("../model/loginModel")
const {contactModel} = require("../model/contactModel")



const bcrypt = require("bcrypt");
const salt = 10;
router.post("/",async(req,res)=>{
    // console.log(req.body)
    const hashedPw = await bcrypt.hash(req.body.password, salt);
    const reqBody = {
        email : req.body.email,
        fullname : req.body.fullname,
        username : req.body.username,
        password: hashedPw
    }

    try {
        const response =  await loginModel.findOne({$or: [ {email:reqBody.email},{username:reqBody.username}] })
        if(response){
            if(response.email === reqBody.email){
                res.json({"email": 1});
            }
            else if(response.username === reqBody.username){
                res.json({"username": 1});
            }
        }else{
            let newUser = await new loginModel({
                email : reqBody.email,
                fullname : reqBody.fullname,
                username : reqBody.username,
                password : reqBody.password
            }).save();
            const newContact =  await new contactModel({
                username: reqBody.username,
                email : reqBody.email,
                contacts : [],
                uuid:newUser.uuid,
            }).save();
            res.json({"signup":1});
        }
    } catch (error) {
        console.log(error);
    }
   
})

module.exports = router;
