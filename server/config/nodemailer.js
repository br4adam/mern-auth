require("dotenv").config()

const nodemailerConfig = {
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
}

module.exports = nodemailerConfig