const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

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

describe('List helper tests', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })


    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes([singleBlog])

        assert.strictEqual(result, 7)
    })


    test('blog with the most likes', () => {
        const result = listHelper.favoriteBlog(listOfBlogs)
        assert.deepStrictEqual(result, listOfBlogs[4]);
    })


    test('author with the most number of blogs', () => {
        const result = listHelper.mostBlogs(listOfBlogs)
        assert.deepStrictEqual(result, { author: 'James May', blogs: 3 });
    })

    test('the author who has the most number of likes', () => {
        const result = listHelper.mostLikes(listOfBlogs)
        assert.deepStrictEqual(result, { author: 'James May', likes: 12 });
    })
}) 
