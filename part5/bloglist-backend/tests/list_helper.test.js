const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

describe('List helper tests', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes([testHelper.singleBlog])

        assert.strictEqual(result, 7)
    })

    test('blog with the most likes', () => {
        const result = listHelper.favoriteBlog(testHelper.listOfBlogs)
        assert.deepStrictEqual(result, testHelper.listOfBlogs[4]);
    })


    test('author with the most number of blogs', () => {
        const result = listHelper.mostBlogs(testHelper.listOfBlogs)
        assert.deepStrictEqual(result, { author: 'James May', blogs: 3 });
    })

    test('the author who has the most number of likes', () => {
        const result = listHelper.mostLikes(testHelper.listOfBlogs)
        assert.deepStrictEqual(result, { author: 'James May', likes: 12 });
    })

}) 