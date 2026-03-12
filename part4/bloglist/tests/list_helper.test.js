const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


const listOfBlogs = [
    {
        _id: '1',
        title: 'Edwin in the world',
        author: 'James May',
        url: 'nyt.com',
        likes: 3,
        __v: 0
    },
    {
        _id: '4',
        title: 'Eating Chicken with cheese',
        author: 'James May',
        url: 'google.com',
        likes: 2,
        __v: 0
    },
    {
        _id: '5',
        title: 'How to dance like the young kids',
        author: 'James May',
        url: 'yahoo.com',
        likes: 7,
        __v: 0
    },
    {
        _id: '2',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    },
    {
        _id: '3',
        title: 'How to talk to cheese',
        author: 'Maire Joe',
        url: 'lovebooks.com',
        likes: 11,
        __v: 0
    }
]

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
})

describe('favorite blog', () => {
    test('blog with the most likes', () => {
        const result = listHelper.favoriteBlog(listOfBlogs)
        assert.deepStrictEqual(result, listOfBlogs[4]);
    })
})

describe('most blogs', () => {
    test('author with the most number of blogs', () => {
        const result = listHelper.mostBlogs(listOfBlogs)
        assert.deepStrictEqual(result, {author: 'James May', blogs: 3});
    })
})

describe('most liked author', () => {
    test('the author who has the most number of likes', () => {
        const result = listHelper.mostLikes(listOfBlogs)
        assert.deepStrictEqual(result, {author: 'James May', likes: 12});
    })
})