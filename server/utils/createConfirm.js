const Confirmation = require("../models/Confirmation")
const crypto = require("crypto")

const createConfirm = async (id) => {
  const secureCode = crypto.randomBytes(128).toString('hex')
  const newConfirmation = new Confirmation({ userId: id, date: new Date(), code: secureCode })
  await newConfirmation.save()
  return newConfirmation.code
}

module.exports = createConfirm