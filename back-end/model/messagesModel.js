const mongoose = require("mongoose")
const messagesSchema = new mongoose.Schema({
    sharedId : {
        type : String,
        required : true,
    },
    msgBody : {
        type : String,
        required : true,
    },
    senderId : {
        type : String,
        required : true,
    },
    time : {
        type : Date,
        default: Date.now,
        required : true
    }
})

var messagesModel = mongoose.model("messagesModel",messagesSchema)

module.exports = {
    messagesModel : messagesModel
}