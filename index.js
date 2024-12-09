require('dotenv').config()
require('./db')

const express = require('express')
const app = express()
const cors = require('cors')

const userRouter = require('./routes/users.routes')
const orderRouter = require('./routes/orders.routes')
const projectRouter = require('./routes/projects.routes')

app.use(express.json())
const PORT = process.env.PORT || 3020
app.use(cors())

app.use('/api', userRouter)
app.use('/api', orderRouter)
app.use('/api', projectRouter)

app.listen(PORT, () => {
  console.log('Server Work', PORT)
})
