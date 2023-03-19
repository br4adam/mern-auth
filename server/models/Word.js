const mongoose = require("mongoose")

const wordSchema = mongoose.Schema({
  text: String
})

module.exports = mongoose.model("Word", wordSchema)