const nodemailer = require("nodemailer")
const nodemailerConfig = require("../config/nodemailer")

const sendMail = (userEmail, subject, content) => {
  const transporter = nodemailer.createTransport(nodemailerConfig)
  const mailOptions = {
    from: nodemailerConfig.user,
    to: userEmail,
    subject: subject,
    html: content
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error)
    console.log(`Email sent: ${info.response}`)
  })
}

module.exports = sendMail