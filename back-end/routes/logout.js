const express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../helper/verifyAuthToken")
router.post("/",verifyToken,(req,res)=>{
    res.json({"logoutAck" : 1});
})

module.exports = router;
