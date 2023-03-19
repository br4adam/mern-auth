const express = require("express")
const router = express.Router()
const User = require("../models/User")
const hashPassword = require("../utils/hashPassword")
const createConfirm = require("../utils/createConfirm")
const sendMail = require("../utils/sendMail")

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body
    if ( !username || !email || !password ) return res.status(401).json("Please fill all the inputs.")
    
    const foundUser = await User.findOne({ $or: [{username: username}, {email: email}] })
    if ( foundUser ) return res.status(409).json("This username or email is already taken.")
    if ( password.length < 8 ) return res.status(403).json("Your password must be at least 8 characters.")
    
    const newUser = await User.create({ username, email, password: await hashPassword(password) })
    
    const secureCode = await createConfirm(newUser._id)
    const subject = "Confirm your registration"
    const content = `Please click on the link to confirm your registration: <a href="http://localhost:5173/confirm?code=${secureCode}&user=${newUser.username}">Confirm</a>`
    sendMail(newUser.email, subject, content)

    res.status(201).json(newUser.username)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

router.post("/check", async (req, res) => {
  const { username, email } = req.body
  const foundUser = await User.findOne({ $or: [{username: username}, {email: email}] })
  if ( foundUser ) return res.status(409).json("This username or email is already taken.")
  return res.status(200)
})

module.exports = router