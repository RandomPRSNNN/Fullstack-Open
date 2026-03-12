const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    if(!request.body.title || !request.body.url)
    {
        response.status(400).json({error: 'author or url missing'})
    }
    else{
        const savedBlog = await new Blog(request.body).save()
        response.status(201).json(savedBlog)
    }
})

module.exports = blogRouter