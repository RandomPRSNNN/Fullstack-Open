import { useState } from "react"
import BlogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [displayBlog, setDisplayBlog] = useState(blog)
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const handleLikeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await BlogService.update(likedBlog)

    console.log('EDWIN', updatedBlog)
    setDisplayBlog(updatedBlog)
  }

  return (
    <div className="blog">
      {displayBlog.title}
      <button id='toggle-visibility-button' onClick={() => toggleVisibility()}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          <div>
            {displayBlog.author}
          </div>
          <div>
            <a href={displayBlog.url.startsWith('http') ? displayBlog.url : `https://${displayBlog.url}`}
              target="_blank"
              rel="noreferrer">
              {displayBlog.url}
            </a>
          </div>
          <div>
            Created by {displayBlog.user.name}
          </div>
          <div>
            {displayBlog.likes}
            <button onClick={() => { handleLikeBlog(displayBlog) }}>Like</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog