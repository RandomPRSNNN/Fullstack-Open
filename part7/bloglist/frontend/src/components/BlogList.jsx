import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
	const logOut = () => {
		window.localStorage.clear()
		window.location.reload()
	}

	const user = useSelector((state) => state.user)
	const blogs = useSelector((state) => state.blogs)
	const mostLikedFirst = [...blogs].sort((a, b) => b.likes - a.likes)

	return (
		<div>
			<h2>Blogs</h2>
			<p style={{ fontWeight: 'bold' }}>
				{user.name} is logged in
				<button onClick={logOut}>Logout</button>
			</p>
			<div>
				{mostLikedFirst.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		</div>
	)
}

export default BlogList
