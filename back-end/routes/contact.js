const express = require("express");
let router = express.Router();
const {loginModel} = require("../model/loginModel")
const {contactModel} = require("../model/contactModel")
const getLoggedUserData = require("../helper/getLoggedUserData");
router.post("/addNew",async(req,res)=>{
    const reqBody = {
        username: req.body.username,
        email : req.body.email
    }
    console.log(req.headers)
    try {
        const response =  await loginModel.findOne({username : reqBody.username})
        if(response && response.email===reqBody.email){//checking if entered username is mathced with email

            //getting logged user data
            const LoggedUserData = await getLoggedUserData(req.headers.authorization.split(' ')[1]); 
            // console.log(LoggedUserData)
            
            const contactResonse =  await contactModel.findOne({username : LoggedUserData.username})
            //checking if user have any contacts ... if no then creating one else pushing new to contact array
            if(!contactResonse){
                const newContact =  await new contactModel({
                    username: LoggedUserData.username,
                    email : LoggedUserData.email,
                    contacts : [{
                        username: reqBody.username,
                        email : reqBody.email,
                    }]
                }).save();
            }else if(contactResonse.contacts && contactResonse.contacts.find(el=>el.username===reqBody.username)){
                    //above condition just to check if new contact already exist or not if yes then send duplicate contact flag 
                    res.json({duplicate : 1})
                    return;
            }else{
                    contactResonse.contacts.push({
                        username: reqBody.username,
                        email : reqBody.email,
                    })
                    contactResonse.save();
            }
            res.json({//if found then sends username and email with found flag
                found : 1,
                username:response.username,
                email : response.email
            })
        }else{//requested new user not found 
            res.json({found:0})
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get("/saved",async(req,res)=>{
    try { 
        var reqToken;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            reqToken =  req.headers.authorization.split(' ')[1]
        }
        const userdata = await getLoggedUserData(reqToken);
        // console.log(userdata);
        const response =  await contactModel.findOne({username : userdata.username},{_id:0,username:0,email:0,"contacts._id":0});
        // console.log(response)
        res.json(response.contacts)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
