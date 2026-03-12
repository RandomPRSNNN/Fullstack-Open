const blogRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blogs = await Blog.findById(request.params.id)
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url) {
        response.status(400).json({ error: 'author or url missing' })
    }
    else {
        const savedBlog = await new Blog(request.body).save()
        response.status(201).json(savedBlog)
    }
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const blogToUpdate = await Blog.findById(request.params.id)

    if (!blogToUpdate){
        response.status(404).end()
    } 
    else{
        blogToUpdate.likes = request.body.likes
        const savedBlog = await blogToUpdate.save()
        response.json(savedBlog)
    }
})

module.exports = blogRouter