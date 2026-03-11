const express = require('express')
const app = express()
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app