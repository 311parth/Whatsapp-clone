const express = require("express");
let router = express.Router();
const {loginModel} = require("../model/loginModel")
const {contactModel} = require("../model/contactModel")
const {conversationModel} = require("../model/conversationModel")
const {messagesModel} = require("../model/messagesModel")

const getLoggedUserData = require("../helper/getLoggedUserData");
const verifyAuthToken = require("../helper/verifyAuthToken");


router.post("/",verifyAuthToken,async (req,res)=>{
    /*
        req : {
            loggedUserid,
            activeChatUserid
        }
    */

    var loggedUserid = req.body.loggedUserid;
    var activeChatUserid = req.body.activeChatUserid;

    if(!loggedUserid || !activeChatUserid ){
        res.sendStatus(400);
        return
    }
    var sharedId = loggedUserid>activeChatUserid ? loggedUserid.concat(activeChatUserid) : activeChatUserid.concat(loggedUserid) ;
    
    var messagesQueryRes = await messagesModel.find({sharedId: sharedId }).sort({time:-1}).limit(100);
    
    res.send({isok:1,sharedId:sharedId,messagesQueryRes : messagesQueryRes});

})

module.exports = router;
