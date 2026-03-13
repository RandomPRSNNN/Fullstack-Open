const blogRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

const getRandomUser = async () => {
    const count = await User.countDocuments()
    const random = Math.floor(Math.random() * count)
    return User.findOne().skip(random)
}

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
    const randomUser = await getRandomUser()

    if (!randomUser) {
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
        "user": randomUser._id
    })
    
    const savedBlog = await blog.save()
    randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
    await randomUser.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const blogToUpdate = await Blog.findById(request.params.id)

    if (!blogToUpdate) {
        response.status(404).end()
    }
    else {
        blogToUpdate.likes = request.body.likes
        const savedBlog = await blogToUpdate.save()
        response.json(savedBlog)
    }
})

module.exports = blogRouter