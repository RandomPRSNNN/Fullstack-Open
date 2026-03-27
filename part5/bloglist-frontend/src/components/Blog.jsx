import { useState } from "react"
import BlogService from '../services/blogs'

const Blog = ({ blog, setNotificationText, user, handleBlogLike: passedLikeHandler, setBlogs, blogs }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  //for testing
  const handleLikeClick = () => {
    if (passedLikeHandler) {
      passedLikeHandler(blog)
    } else {
      handleBlogLike(blog)
    }
  }

  const handleBlogLike = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await BlogService.update(likedBlog)

    setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
  }

  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)) {
      const response = await BlogService.remove(blog)

      if (response.status === 204) {
        setNotificationText('Blog deleted')
        const updatedBlogs = blogs.filter(blog2 => blog2.id !== blog.id)
        setBlogs(updatedBlogs)
      }
    }
  }

  return (
    <>
      {blog && (
        <div className="blog">
          {blog.title} by {blog.author}
          <button onClick={() => toggleVisibility()}>
            {showDetails ? 'hide' : 'view'}
          </button>

          {showDetails && (
            <div>
              <div>
                <a
                  href={blog.url.startsWith('http') ? blog.url : `https://${blog.url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {blog.url}
                </a>
              </div>
              <div>Created by {blog.user.name}</div>
              <div>
                <div className="likes-count">
                  {blog.likes}
                </div>
                <button className="likeButton" onClick={() => handleLikeClick(blog)}>Like</button>
              </div>

              {blog.user.username === user.username && (
                <div>
                  <button className='removeButton' onClick={() => handleBlogDelete(blog)}>Remove</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Blog