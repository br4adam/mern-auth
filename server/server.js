const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000
const colors = require("colors")
const connectDB = require("./config/database")

const signUpRoutes = require("./routes/signup")
const loginRoutes = require("./routes/login")
const publicRoutes = require("./routes/public")
const privateRoutes = require("./routes/private")
const resetRoutes = require("./routes/reset")
const passwordRoutes = require("./routes/password")
const confirmRoutes = require("./routes/confirm")

app.use(express.json())
app.use(cors())

connectDB()

app.use("/api/signup", signUpRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/public", publicRoutes)
app.use("/api/private", privateRoutes)
app.use("/api/reset", resetRoutes)
app.use("/api/password", passwordRoutes)
app.use("/api/confirm", confirmRoutes)

app.listen(port, () => { console.log(`Server started on port ${port}.`.cyan) })