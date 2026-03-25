import { useState } from "react"
import BlogService from '../services/blogs'

const Blog = ({ blog, setNotificationText, user }) => {
  const [displayBlog, setDisplayBlog] = useState(blog)
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const handleBlogLike = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await BlogService.update(likedBlog)
    setDisplayBlog(updatedBlog)
  }

  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)) {
      const response = await BlogService.remove(blog)
      
      if(response.status === 204)
      {
        setDisplayBlog(null)
        setNotificationText('Blog deleted')
      }
    }
  }

  return (
    <>
      {displayBlog && (
        <div className="blog">
          {displayBlog.title}
          <button id='toggle-visibility-button' onClick={() => toggleVisibility()}>
            {showDetails ? 'hide' : 'view'}
          </button>

          {showDetails && (
            <div>
              <div>{displayBlog.author}</div>
              <div>
                <a
                  href={displayBlog.url.startsWith('http') ? displayBlog.url : `https://${displayBlog.url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {displayBlog.url}
                </a>
              </div>
              <div>Created by {displayBlog.user.name}</div>
              <div>
                {displayBlog.likes}
                <button onClick={() => handleBlogLike(displayBlog)}>Like</button>
              </div>

              {blog.user.username === user.username && (
                <div>
                  <button onClick={() => handleBlogDelete(displayBlog)}>Remove</button>
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