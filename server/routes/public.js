const express = require("express")
const router = express.Router()
const Word = require("../models/Word")

router.get("/", async (req, res) => {
  const public = await Word.findOne({ text: "public" })
  return res.json(public.text)
})

module.exports = router