const mongoose = require("mongoose")

const resetSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: false
  },
  date: {
    type: Date,
    required: true,
  },
  code: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Reset", resetSchema)