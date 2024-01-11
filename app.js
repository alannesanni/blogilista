const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')
const middleware = require('./middleware')

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }


const http = require('http')

logger.info('connecting to', config.MONGODB_URL)

const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl) 
    .then(() => {
    logger.info('connected to MongoDB')})

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app