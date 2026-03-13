const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')

const api = supertest(app)

const listOfBlogs = [
    {
        title: 'Edwin in the world',
        author: 'James May',
        url: 'nyt.com',
        likes: 3
    },
    {
        title: 'Eating Chicken with cheese',
        author: 'James May',
        url: 'google.com',
        likes: 2
    },
    {
        title: 'How to dance like the young kids',
        author: 'James May',
        url: 'yahoo.com',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5
    },
    {
        title: 'How to talk to cheese',
        author: 'Maire Joe',
        url: 'lovebooks.com',
        likes: 11
    }
]

const singleBlog = {
    title: 'How to add a new blog',
    author: 'Betsy Gold',
    url: 'https://homepages.cwi.nl/~storm/',
    likes: 7
}

const singleBlogNoUrl = {
    title: 'How to add a new blog',
    author: 'Betsy Gold',
    likes: 7
}

const singleBlogNoTitle = {
    author: 'Betsy Gold',
    url: 'https://homepages.cwi.nl/~storm/',
    likes: 7
}

const singleBlogNoLikes = {
    title: 'How to add a new blog',
    author: 'Betsy Gold',
    url: 'https://homepages.cwi.nl/~storm/'
}

const singleUser = {
    username: 'testyTest',
    name: 'Edwin Joes',
    password: '12345',
}

const singleUserShortUsername = {
    username: 'NO',
    name: 'Edwin Bleeds',
    password: 'shortUsername',
}

const singleUserShortPassword = {
    username: 'EdwinShortPassword',
    name: 'Edwin Joes',
    password: 'NO',
}

const createLoggedInUserGetToken = async () => {
    const user = {
        username: 'testing',
        password: 'cheese'
    }

    await api.post('/api/users').send(user)
    const loggedIn = await api.post('/api/login').send(user)
    return `Bearer ${loggedIn.body.token}`
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}



module.exports = {
    createLoggedInUserGetToken,
    listOfBlogs,
    singleBlog,
    singleBlogNoLikes,
    singleBlogNoUrl,
    singleBlogNoTitle,
    singleUser,
    singleUserShortUsername,
    singleUserShortPassword,
    usersInDB
} 