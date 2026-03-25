const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blogs = await Blog.findById(request.params.id)
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    if (!request.user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }
    if (!request.body.title || !request.body.url) {
        return response.status(400).json({ error: 'author or url missing' })
    }

    const blog = new Blog({
        "title": body.title,
        "author": body.author,
        "url": body.url,
        "likes": body.likes,
        "user": request.user._id
    })

    const savedBlog = await blog.save()
    await savedBlog.populate('user', { username: 1, name: 1 })
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)

    if (request.user.id.toString() === blogToDelete.user.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else {
        response.status(403).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const blogToUpdate = await Blog.findById(request.params.id)

    if (!blogToUpdate) {
        response.status(404).end()
    }
    else if (blogToUpdate.user.equals(request.body.user.id)) {
        const { title, author, url, likes } = request.body

        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            { title, author, url, likes },
            { new: true }
        ).populate('user', { username: 1, name: 1 })

        return response.json(updatedBlog)
    }
    else {
        return response.status(401).json({ error: `unauthorized` })
    }
})

module.exports = blogRouter