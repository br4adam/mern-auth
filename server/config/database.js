const mongoose = require("mongoose")
require("dotenv").config()

mongoose.set("strictQuery", false)

const url = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(url)
    console.log(`MongoDB connected.` .green)
  } catch (error) {
    console.log(error.message .red)
  }
}

module.exports = connectDB