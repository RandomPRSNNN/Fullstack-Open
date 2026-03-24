import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Create from './components/Create'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  return (
    <div>
      {!user && <Login setUser={setUser} />}
      {user &&
        <BlogList
          blogs={blogs}
          user={user} />}
      {user &&
        <Create
          user={user}
          setBlogs={setBlogs}
          blogs={blogs} />}
    </div>
  )
}

export default App