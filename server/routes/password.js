const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Reset = require("../models/Reset")
const hashPassword = require("../utils/hashPassword")

router.post("/", async (req, res) => {
  const { username, newPassword, passwordAgain, code } = req.body
  const user = await User.findOne({ $or: [{username: username}, {email: username}] })
  if ( !user ) return res.status(404).json("User not found.")
  if ( newPassword.length < 8 ) return res.status(403).json("Your password must be at least 8 characters.")
  if ( newPassword !== passwordAgain ) return res.status(403).json("Passwords do not match.")

  const foundCode = await Reset.findOne({ code: code })
  if ( (new Date() - foundCode.date) > (5*60*1000) ) return res.status(410).json("This password reset link is expired.")

  const updatedUser = await User.findOneAndUpdate({ username: user.username }, { password: await hashPassword(newPassword) }, { new: true })
  res.status(200).json(updatedUser.username)
})

module.exports = router