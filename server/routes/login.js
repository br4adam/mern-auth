const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
require("dotenv").config()

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body
    if ( !username || !password ) return res.status(400).json("Please fill all the inputs.")
    
    const user = await User.findOne({ $or: [{username: username}, {email: username}] })
    if ( !user || !bcrypt.compareSync(password, user.password) ) return res.status(403).json("Invalid user or password.")
    if ( !user.confirmed ) return res.status(401).json("You should confirm your registration before login.")
    
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 3600 } )
    res.status(200).json(token)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

module.exports = router