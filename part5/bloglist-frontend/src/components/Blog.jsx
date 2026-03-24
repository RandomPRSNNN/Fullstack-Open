import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="blog">
      {blog.title}
      <button id='toggle-visibility-button' onClick={() => toggleVisibility()}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          <div>
            {blog.author}
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            {blog.likes}
            <button>Like</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog