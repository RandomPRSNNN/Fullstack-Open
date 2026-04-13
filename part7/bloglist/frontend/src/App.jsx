import './index.css'
import { useEffect, useRef } from 'react'
import { initBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { reloadUserData } from './reducers/userReducer'

import BlogList from './components/BlogList'
import Login from './components/Login'
import Create from './components/Create'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const createBlogRef = useRef()

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(reloadUserData())
	}, [])

	return (
		<div>
			<Notification />

			{!user.username ? (
				<Login />
			) : (
				<>
					<Togglable
						buttonLabel="Create new Blog"
						ref={createBlogRef}
					>
						<Create
							toggleHide={() =>
								createBlogRef.current.toggleVisibility()
							}
						/>
					</Togglable>
					<BlogList />
				</>
			)}
		</div>
	)
}

export default App
