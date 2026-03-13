const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const testHelper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)
describe('Use API tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const saltRounds = 10
        const passwordHash = await bcrypt.hash('secretPassword', saltRounds)
        const user = new User({ username: 'admin', passwordHash })

        await user.save()
    })

    test('creating new user', async () => {
        const usersAtStart = await testHelper.usersInDB()

        await api
            .post('/api/users')
            .send(testHelper.singleUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(testHelper.singleUser.username))
    })

    test('creating user with incorrect username length', async () => {
        await api
            .post('/api/users')
            .send(testHelper.singleUserShortUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDB()
        const usernames = usersAtEnd.map(user => user.username)
        assert(!usernames.includes(testHelper.singleUserShortUsername.username))
    })

    test('creating user with incorrect password length', async () => {
        await api
            .post('/api/users')
            .send(testHelper.singleUserShortPassword)
            .expect(422)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDB()
        const usernames = usersAtEnd.map(user => user.username)
        assert(!usernames.includes(testHelper.singleUserShortPassword.username))
    })

    after(async () => {
        await mongoose.connection.close()
    })
})
