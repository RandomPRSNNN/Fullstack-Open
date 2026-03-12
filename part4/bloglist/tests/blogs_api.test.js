const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const listOfBlogs = [
    {
        title: 'Edwin in the world',
        author: 'James May',
        url: 'nyt.com',
        likes: 3,
        __v: 0
    },
    {
        title: 'Eating Chicken with cheese',
        author: 'James May',
        url: 'google.com',
        likes: 2,
        __v: 0
    },
    {
        title: 'How to dance like the young kids',
        author: 'James May',
        url: 'yahoo.com',
        likes: 7,
        __v: 0
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    },
    {
        title: 'How to talk to cheese',
        author: 'Maire Joe',
        url: 'lovebooks.com',
        likes: 11,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listOfBlogs)
})

test('notes are returned as json', async () => {
    const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.length, listOfBlogs.length)
})

test('blogs unique identifier is ID', async () => {
    const allBlogs = await api.get('/api/blogs')

    let check = true
    for (const blog of allBlogs.body) {
        if (!blog.id) {
            check = false
        }
    }

    assert.strictEqual(check, true)
})

test('new blog created', async () => {
    const newBlog = {
        title: 'How to add a new blog',
        author: 'Betsy Gold',
        url: 'https://homepages.cwi.nl/~storm/',
        likes: 7
    }

    await api.post('/api/blogs').send(newBlog)
    const afterPost = await api.get('/api/blogs')

    const newExists = afterPost.body.some(blog =>
        blog.title === newBlog.title && blog.author === newBlog.author
    )

    assert.strictEqual(true, newExists)
})

test('default likes 0', async () => {
    const newBlog = {
        title: 'Blog Blog',
        author: 'Kitchen Gold',
        url: 'https://homepages.cwi.nl'
    }

    const result = await api.post('/api/blogs').send(newBlog)
    const check = result.body.likes === 0 ? true : false

    assert.strictEqual(true, check)
})

test('no title 400', async () => {
    const newBlog = {
        author: 'Kitchen Gold',
        url: 'https://homepages.cwi.nl'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('no url 400', async () => {
    const newBlog = {
        title: 'Blog Blog',
        author: 'Kitchen Gold'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
})



after(async () => {
    await mongoose.connection.close()
})