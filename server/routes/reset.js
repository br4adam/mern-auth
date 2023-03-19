const express = require("express")
const router = express.Router()
const User = require("../models/User")
const createSecureCode = require("../utils/createSecureCode")
const sendMail = require("../utils/sendMail")

router.post("/", async (req, res) => {
  const username = req.body.username
  const user = await User.findOne({ $or: [{username: username}, {email: username}] })
  if ( !user ) return res.status(404).json("User not found.")
  
  const secureCode = await createSecureCode(user._id)
  const subject = "Reset your password"
  const content = `Resetting your password is easy. Just click on the link to change your password: <a href="http://localhost:5173/reset?code=${secureCode}&user=${user.username}">Change password</a>`
  sendMail(user.email, subject, content)

  return res.status(200).json(user.username)
})

module.exports = router