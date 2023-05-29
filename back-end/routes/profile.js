const express = require("express");
let router = express.Router();

const { profileImageModel } = require("../model/profileImageModel");
router.route("/profileImg/:username").get(async (req, res) => {
  //NOTE: here test user's image  is selected as default image 
    try {
      const resFromDb = await profileImageModel
        .findOne({ username: req.params.username })
        .clone();
      if(resFromDb){
            res.contentType(resFromDb.img.contentType);
            res.send(resFromDb.img.data);
      }
      //if not getting result then return default  image
      else {
        const resOfDefaultImg = await profileImageModel
          .findOne({ username: "test" })
          .clone();
        if(resOfDefaultImg){
          res.contentType(resOfDefaultImg.img.contentType);
            res.send(resOfDefaultImg.img.data);
        }
      }
      
    } catch (error) {
      console.log(error)
    }
  });
  
module.exports = router;
