const Reset = require("../models/Reset")
const crypto = require("crypto")

const createSecureCode = async (id) => {
  const secureCode = crypto.randomBytes(128).toString('hex')
  const newReset = new Reset({ userId: id, date: new Date(), code: secureCode })
  await newReset.save()
  return newReset.code
}

module.exports = createSecureCode