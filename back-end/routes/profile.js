const express = require("express");
let router = express.Router();

const { profileImageModel } = require("../model/profileImageModel");
const {contactModel} = require("../model/contactModel")
const  getLoggedUserData = require("../helper/getLoggedUserData");
router.route("/profileImg/:username").get(async (req, res) => {
  //NOTE: here test user's image  is selected as default image 

    try {
      if(!req.headers.authorization){
        res.sendStatus(403);
        return;
      }
      const reqestedUsername = req.params.username;
      const LoggedUserData = await getLoggedUserData(req.headers.authorization.split(' ')[1]);
      if(!LoggedUserData || !LoggedUserData.username){
        res.sendStatus(403);
        return;
      }

      const resOfDefaultImg = await profileImageModel
          .findOne({ username: "test" })
          .clone();
      //If "A" is requesting the profile picture of "B", access should be granted only if "A" is saved in "B's" contacts.
      const resContacts = await contactModel.findOne({username:reqestedUsername});
      const resContactsArr = resContacts?.contacts;
      // console.log(reqestedUsername,resContactsArr);

      // console.log(resContactsArr?.some(obj=>obj.username===LoggedUserData.username));
      // above return true if loggeduser is present in that array 


      // if reqestedUsername is not present in contact array  and its not self request then return 403  
      if(!resContacts || !resContactsArr.some(obj=>obj.username===LoggedUserData.username) &&  reqestedUsername!==LoggedUserData.username ){
        // res.sendStatus(403);
        res.contentType(resOfDefaultImg.img.contentType);
        res.send(resOfDefaultImg.img.data);
        return;
      }
      const resFromDb = await profileImageModel
        .findOne({ username: req.params.username })
        .clone();
      if(resFromDb){
            res.contentType(resFromDb.img.contentType);
            res.send(resFromDb.img.data);
      }
      //if not getting result then return default  image
      else {
        
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
