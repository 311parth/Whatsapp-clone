const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
    email : String,
    username: String,
    contacts  : [
        {
            username: String,
            email : String
        }
    ]
})

var contactModel = mongoose.model("contactModels",contactSchema)

module.exports = {
    contactModel : contactModel
}