const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Confirmation = require("../models/Confirmation")

router.post("/", async (req, res) => {
  const { username, code } = req.body
  
  const user = await User.findOne({ $or: [{username: username}, {email: username}] })
  if ( !user ) return res.status(403).json("User not found.")

  const foundCode = await Confirmation.findOne({ code: code })
  if ( !foundCode ) return res.status(400).json("Confirmation error.")
  if ( (new Date() - foundCode.date) > (5*60*1000) ) return res.status(410).json("This confirmation link is expired.")

  const updatedUser = await User.findOneAndUpdate({ username: user.username }, { confirmed: true }, { new: true })
  res.status(200).json(updatedUser.username)
})

module.exports = router