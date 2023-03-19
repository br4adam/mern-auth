const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"]
  if ( !header ) return res.status(401)
  const token = header.split(" ")[1]
  
  if ( token ) {
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) console.log(error)
      res.locals.user = decoded?.id
      console.log(res.locals.user)
      next()
    })
  }
}

module.exports = verifyToken