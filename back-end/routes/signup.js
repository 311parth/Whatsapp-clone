const express = require("express");
let router = express.Router();
const { loginModel } = require("../model/loginModel");
const { contactModel } = require("../model/contactModel");

const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");

const { profileImageModel } = require("../model/profileImageModel");
var profileImgFileTypeErrorStatus = false;

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
  // console.log(file.mimetype)
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
    // console.log(0.5,Date.now())
  } else {
    profileImgFileTypeErrorStatus = true;
    cb(null, false);
    // console.log("rejected file")
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

async function saveProfileImgToDB(req, res, next) {
  try {
    console.log(profileImgFileTypeErrorStatus);
    if (profileImgFileTypeErrorStatus) {
      return res.json({ profilePic: 1 });
    }
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
        await profileImageModel.deleteOne({ username: req.body.username });
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
    } else {
      return res.json({ profilePic: 1 });
    }
  } catch (error) {
    console.log(error);
  }
}

const bcrypt = require("bcrypt");
const salt = 10;
const checkUserExists = async (email, username) => {
  try {
    return await loginModel.findOne({ $or: [{ email }, { username }] });
  } catch (error) {
    throw error;
  }
};

const createUser = async (email, fullname, username, password) => {
  try {
    const newUser = await new loginModel({
      email,
      fullname,
      username,
      password,
    }).save();

    await new contactModel({
      username,
      email,
      contacts: [],
      uuid: newUser.uuid,
    }).save();

    return newUser;
  } catch (error) {
    throw error;
  }
};

router.post("/", upload.single("inputProfileImg"),saveProfileImgToDB, async (req, res) => {
  const { email, fullname, username, password } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, salt);

    const existingUser = await checkUserExists(email, username);

    if (existingUser) {
      if (existingUser.email === email) {
        res.json({ email: 1 });
      } else if (existingUser.username === username) {
        res.json({ username: 1 });
      }
    } else {
      await createUser(email, fullname, username, hashedPw);


      res.json({ signup: 1 });
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
