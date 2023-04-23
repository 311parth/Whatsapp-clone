const express = require("express");
let router = express.Router();
const {loginModel} = require("../model/loginModel")
const {contactModel} = require("../model/contactModel")
const {conversationModel} = require("../model/conversationModel")

const getLoggedUserData = require("../helper/getLoggedUserData");
const verifyToken = require("../helper/verifyAuthToken");
router.post("/addNew",verifyToken,async(req,res)=>{
    const reqBody = {
        username: req.body.username,
        email : req.body.email
    }
    // console.log(req.headers)
    try {
        const response =  await loginModel.findOne({username : reqBody.username});
        if(response && response.email===reqBody.email){//checking if entered username is mathced with email

            //getting logged user data
            const LoggedUserData = await getLoggedUserData(req.headers.authorization.split(' ')[1]); 
            // console.log(LoggedUserData)
            
            const contactResponse =  await contactModel.findOne({username : LoggedUserData.username})

            var isDuplicate = false;//flag for duplicate 
            //checking if user have any contacts ... if no then creating one else pushing new to contact array
            if(!contactResponse){
                const newContact =  await new contactModel({
                    username: LoggedUserData.username,
                    email : LoggedUserData.email,
                    contacts : [{
                        username: reqBody.username,
                        email : reqBody.email,
                        userid:response.uuid,
                        saved : 1,
                    }],
                    uuid:LoggedUserData.userid,
                }).save();
            }else{
                    var contactResOfFind = contactResponse.contacts.find(el=>el.username===reqBody.username);
                    if(!contactResOfFind){
                        //that means contact is not exist in anyform 
                        contactResponse.contacts.push({
                            username: reqBody.username,
                            email : reqBody.email,
                            userid:response.uuid,
                            saved: 1
                        })
                        contactResponse.save();
                    }else{
                        if(!contactResOfFind.saved){
                            //that means contact is there but flag saved is 0 so its unsaved..
                            //so changing  it saved 
                            contactResponse.contacts.find(el=>el.username===reqBody.username).saved=1;
                            contactResponse.save();
                        }else{
                            //contact is saved already 
                            res.json({duplicate : 1})
                            isDuplicate = true;
                            return;
                        }
                    }
            }
            if(!isDuplicate){//if not duplicate then make a document inside conversationModel
                if(response.uuid && LoggedUserData.userid){
                    //comparing both id and getting shared it based on lexicographic (dictionary) comparison between the two strings based on their Unicode values
                    var sharedId = response.uuid>LoggedUserData.userid ? response.uuid.concat(LoggedUserData.userid) : LoggedUserData.userid.concat(response.uuid);  ;
                    const newConversation = await new conversationModel({
                        sharedId :  sharedId,
                        participants :[response.username,LoggedUserData.username],
                    }).save();
                }
            }
            res.json({//if found then sends username and email with found flag
                found : 1,
                username:response.username,
                email : response.email,
                userid:response.uuid
            })
        }else{//requested new user not found 
            res.json({found:0})
        }
    } catch (error){
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
        if(!response || !response.contacts)res.json([]);
        else res.json(response.contacts) 
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
