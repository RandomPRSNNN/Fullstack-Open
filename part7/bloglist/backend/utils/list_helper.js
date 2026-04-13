const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0;

    for (let post of blogs) {
        total += post.likes
    }

    return total
}

const favoriteBlog = (blogs) => {
    const mostLiked = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current;
    })

    return mostLiked
}

const mostBlogs = (blogs) => {
    const authorCounts = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1;
        return acc;
    }, {})

    const topAuthorName = Object.keys(authorCounts).reduce((a, b) =>
        authorCounts[a] > authorCounts[b] ? a : b
    )

    return {
        author: topAuthorName,
        blogs: authorCounts[topAuthorName]
    }
}

const mostLikes = (blogs) => {
    const authorLikesMap = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
    }, {})

    const topAuthor = Object.keys(authorLikesMap).reduce((a, b) =>
        authorLikesMap[a] > authorLikesMap[b] ? a : b
    )

    return {
        author: topAuthor,
        likes: authorLikesMap[topAuthor]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}