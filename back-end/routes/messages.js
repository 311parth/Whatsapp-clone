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
    res.send({isok:1});
})

module.exports = router;
