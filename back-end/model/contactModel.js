const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
    email : String,
    username: String,
    contacts  : [
        {
            username: String,
            email : String,
            userid: String,
            saved : Boolean
        }
    ],
    uuid:String,
})

var contactModel = mongoose.model("contactModels",contactSchema)

module.exports = {
    contactModel : contactModel
}