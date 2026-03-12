const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app