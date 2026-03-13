const { test, after, beforeEach, describe } = require('node:test')
const testHelper = require('./test_helper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('API blogs tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(testHelper.listOfBlogs)
        await User.deleteMany({})
    })

    test('blogs are returned as json', async () => {
        const result = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.length, testHelper.listOfBlogs.length)
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
        const newUserToken = await testHelper.createLoggedInUserGetToken()

        await api.post('/api/blogs')
            .set('Authorization', newUserToken)
            .send(testHelper.singleBlog)
        const afterPost = await api.get('/api/blogs')

        const newExists = afterPost.body.some(blog =>
            blog.title === testHelper.singleBlog.title && blog.author === testHelper.singleBlog.author
        )

        assert.strictEqual(true, newExists)
    })

    test('default likes 0', async () => {
        const newBlog = {
            title: 'Blog Blog',
            author: 'Kitchen Gold',
            url: 'https://homepages.cwi.nl'
        }

        const newUserToken = await testHelper.createLoggedInUserGetToken()

        const result = await api.post('/api/blogs')
            .set('Authorization', newUserToken)
            .send(newBlog)
        const check = result.body.likes === 0 ? true : false

        assert.strictEqual(true, check)
    })

    test('no title 400', async () => {
        const newBlog = {
            author: 'Kitchen Gold',
            url: 'https://homepages.cwi.nl'
        }

        const newUserToken = await testHelper.createLoggedInUserGetToken()

        await api.post('/api/blogs')
            .set('Authorization', newUserToken)
            .send(newBlog)
            .expect(400)
    })

    test('no url 400', async () => {
        const newBlog = {
            title: 'Blog Blog',
            author: 'Kitchen Gold'
        }

        const newUserToken = await testHelper.createLoggedInUserGetToken()

        await api.post('/api/blogs')
            .set('Authorization', newUserToken)
            .send(newBlog)
            .expect(400)
    })

    test('deletion of blog', async () => {
        const newBlog = {
            title: 'Blog Blog',
            url: 'https://edwin.com/yas',
            author: 'Kitchen Gold'
        }

        const userToken = await testHelper.createLoggedInUserGetToken()

        const createdBlog = await api.post('/api/blogs/')
            .set('Authorization', userToken)
            .send(newBlog)

        await api.delete(`/api/blogs/${createdBlog.body.id}`)
            .set('Authorization', userToken)
            .expect(204)
    })

    test('update blog likes', async () => {
        const newBlog = {
            title: 'Blog Blog',
            url: 'https://edwin.com/yas',
            author: 'Kitchen Gold'
        }

        const newUserToken = await testHelper.createLoggedInUserGetToken()
        const createdBlog = await api.post('/api/blogs/')
            .set('Authorization', await newUserToken)
            .send(newBlog)

        await api.put(`/api/blogs/${createdBlog.body.id}`).send({ likes: 999 })
        const updatedBlog = await api.get(`/api/blogs/${createdBlog.body.id}`)
        assert.strictEqual(999, updatedBlog.body.likes)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})