const express = require("express")
const router = express.Router()
const Word = require("../models/Word")
const verifyToken = require("../middlewares/verifyToken")

router.get("/", verifyToken, async (req, res) => {
  if ( !res.locals.user ) return res.status(403).json("User not found.")
  const private = await Word.findOne({ text: "private" })
  return res.json(private.text)
})

module.exports = router