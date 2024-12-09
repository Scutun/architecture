require("dotenv").config()
require("./db")

const express = require("express")
const app = express()
const cors = require("cors")

const userRouter = require("./routes/users.routes")
const orderRouter = require("./routes/orders.routes")
const projectRouter = require("./routes/projects.routes")
const commentRouter = require("./routes/comments.routes")
const architectRouter = require("./routes/architects.routes")

app.use(express.json())
app.use(cors())

app.use("/api", userRouter)
app.use("/api", orderRouter)
app.use("/api", projectRouter)
app.use("/api", commentRouter)
app.use("/api", architectRouter)

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
	console.log("Server Work", PORT)
})
