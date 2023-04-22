const mongoose = require("mongoose")
const conversationSchema = new mongoose.Schema({
    sharedId : {
        type : String,//sahred id is combo of two userid and sharedid =  higher userid + lower userid (appending)
        unique: true,
    },
    participants: [String],
})

var conversationModel = mongoose.model("conversationModel",conversationSchema)

module.exports = {
    conversationModel : conversationModel
}