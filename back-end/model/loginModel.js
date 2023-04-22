const {nanoid} = require("nanoid");

const mongoose = require("mongoose")
const loginSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: () => nanoid(7),
        unique: true
    },
    email : String,
    username: String,
    password : String,
    fullname: String,
})

var loginModel = mongoose.model("loginModel",loginSchema)

module.exports = {
    loginModel : loginModel
}