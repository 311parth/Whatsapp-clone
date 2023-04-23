const express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../helper/verifyAuthToken")
router.get("/",verifyToken,(req,res)=>{
    res.send("/test get");
})

module.exports = router;
