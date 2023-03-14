const mongoose = require("mongoose")
const loginSchema = new mongoose.Schema({
    email : String,
    username: String,
    password : String,
    fullname: String,
})

var loginModel = mongoose.model("loginModel",loginSchema)

module.exports = {
    loginModel : loginModel
}