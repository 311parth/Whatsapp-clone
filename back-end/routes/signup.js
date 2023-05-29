const express = require("express");
let router = express.Router();
const {loginModel} = require("../model/loginModel")
const {contactModel} = require("../model/contactModel")

const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");

const { profileImageModel } = require("../model/profileImageModel");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //cb stands for call back that auto call by multer
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
      // console.log(0.5,Date.now())
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });
  
  
  
  async function saveProfileImgToDB(req, res, next) {
    try {
      if (req.file) {
        // console.log(req.file);
        sharp.cache(false);
  
  
        // console.log(1, Date.now());
        const resize = new Promise((resolve, reject) => {
          sharp(`./uploads/${req.file.filename}`)
            .resize(256, 256)
            .toFile(
              `uploads/${"_resized" + req.file.filename}`,
              function (err, info) {
                if (err) console.log("E", err);
                // console.log(info);
                // console.log(1.5, Date.now());
                resolve(1);
              }
            );
        });
  
        resize.then(async () => {
          await profileImageModel.deleteOne({username:req.body.username});
          // console.log(2, Date.now());
          const saveImage = await profileImageModel({
            username: req.body.username,
            img: {
              data: fs.readFileSync("uploads/" + "_resized" + req.file.filename),
              contentType: "image/png",
            },
          });
          // console.log(3, Date.now());
          saveImage
            .save()
            .then((res) => {
              // console.log("image is saved");
            })
            .catch((err) => {
              console.log(err, "error has occur");
            });
          // console.log(req.body);
          fs.rm("uploads/" + req.file.filename, () => {
            fs.rm("uploads/" + "_resized" + req.file.filename, () => {});
            // console.log(3, Date.now());
            // console.log("stored at db removed at server");
          });
          next();
        });
      }
        
    } catch (error) {
      console.log(error)
    }
  }

const bcrypt = require("bcrypt");
const salt = 10;
router.post("/",upload.single("inputProfileImg"), saveProfileImgToDB,async(req,res)=>{
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
