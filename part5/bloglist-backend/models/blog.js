const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI
logger.info('Connecting', url)

mongoose.connect(url)
    .then(result => {
        logger.info('Connected to DB')
    })
    .catch(caughtError => {
        logger.error('DID NOT connect to server', caughtError.message)
    })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Blog', blogSchema)