import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
    }
  }

  if (!user) {
    return (
      <form onSubmit={handleLogin}>
        <h3>Please login</h3>
        <label>username
          <input onChange={(e) => setUsername(e.target.value)}></input>
        </label>
        <br />
        <label>
          password
          <input onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    )
  }

  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p style={{ fontWeight: 'bold' }}>
        {user.name} is logged in
        <button onClick={logOut}>Logout</button>
      </p>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App