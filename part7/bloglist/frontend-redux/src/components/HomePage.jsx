import { reloadUserData } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'
import { useRef, useEffect } from 'react'

import Togglable from './Togglable'
import Create from './Create'
import BlogList from './BlogList'
import Login from './Login'

const HomePage = () => {
	const dispatch = useDispatch()
	const createBlogRef = useRef()
	const user = useSelector((state) => state.user)

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(reloadUserData())
	}, [])

	return (
		<div>
			{!user.username ? (
				<Login />
			) : (
				<div>
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
				</div>
			)}
		</div>
	)
}

export default HomePage
