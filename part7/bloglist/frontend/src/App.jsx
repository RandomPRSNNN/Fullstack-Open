import { useState, useEffect, useRef } from 'react'
import './index.css'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Create from './components/Create'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notificationText, setNotificationText] = useState('')
	const createBlogRef = useRef()

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
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
			<Notification text={notificationText} />

			{!user ? (
				<Login
					setUser={setUser}
					setNotificationText={setNotificationText}
				/>
			) : (
				<>
					<Togglable
						buttonLabel="Create new Blog"
						ref={createBlogRef}
					>
						<Create
							user={user}
							setBlogs={setBlogs}
							blogs={blogs}
							setNotificationText={setNotificationText}
							toggleHide={() =>
								createBlogRef.current.toggleVisibility()
							}
						/>
					</Togglable>
					<BlogList
						setNotificationText={setNotificationText}
						blogs={blogs}
						setBlogs={setBlogs}
						user={user}
					/>
				</>
			)}
		</div>
	)
}

export default App
