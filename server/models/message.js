const mongoose = require("mongoose")

const message = new mongoose.Schema({
    email: {type: String, require: true },
    subject: {type: String, require: true },
    message: {type: String, require: true },
})

module.exports = mongoose.model("Message", message)