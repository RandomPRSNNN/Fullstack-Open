const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

beforeEach(async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('secretPassword', saltRounds)
    const user = new User({ username: 'admin', passwordHash })

    await user.save()
})

test('creating new user', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
        username: 'testyTest',
        name: 'Edwin Joes',
        password: '12345',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
})

test('creating user with incorrect username length', async () => {
    const newUser = {
        username: 'NO',
        name: 'Edwin Wrong',
        password: '12345',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    const usernames = usersAtEnd.map(user => user.username)
    assert(!usernames.includes(newUser.username))
})

test('creating user with incorrect password length', async () => {
    const newUser = {
        username: 'sheepAsleep',
        name: 'Edwin Wrong Password',
        password: 'NO',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(422)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    const usernames = usersAtEnd.map(user => user.username)
    assert(!usernames.includes(newUser.username))
})

after(async () => {
    await mongoose.connection.close()
})
