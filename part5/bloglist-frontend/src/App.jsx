import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Create from './components/Create'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationText, setNotificationText] = useState('')

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
      <Notification
        text={notificationText}/>
      {!user &&
        <Login
          setUser={setUser}
          setNotificationText={setNotificationText}
        />}
      {user &&
        <BlogList
          blogs={blogs}
          user={user} />}
      {user &&
        <Create
          user={user}
          setBlogs={setBlogs}
          blogs={blogs}
          setNotificationText={setNotificationText} />}
    </div>
  )
}

export default App