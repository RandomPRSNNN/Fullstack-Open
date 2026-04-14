import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs)
	const mostLikedFirst = [...blogs].sort((a, b) => b.likes - a.likes)

	return (
		<div>
			{mostLikedFirst.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default BlogList
