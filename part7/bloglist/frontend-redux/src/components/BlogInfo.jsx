import { displayNotification } from '../reducers/notificationReducer'
import { removeBlog, handleLike } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import BlogService from '../services/blogs'

const BlogInfo = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)
	const blog = blogs.find((b) => b.id === id)

	const handleBlogLike = async (blog) => {
		dispatch(handleLike(blog))
		dispatch(displayNotification(`Blog liked: ${blog.title}`))
	}

	const handleBlogDelete = async (blog) => {
		if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)) {
			const response = await BlogService.remove(blog)

			if (response.status === 204) {
				navigate('/')
				dispatch(removeBlog(blog))
				dispatch(displayNotification('Blog deleted'))
			}
		}
	}

	if (!blog) return null

	return (
		<div>
			<h1>
				{blog.title} by {blog.author}
			</h1>
			<a
				href={
					blog.url.startsWith('http')
						? blog.url
						: `https://${blog.url}`
				}
				target="_blank"
				rel="noreferrer"
			>
				{blog.url}
			</a>
			<div>Created by {blog.user.name}</div>
			<div>
				<div className="likes-count">{blog.likes} likes</div>
				<button
					className="likeButton"
					onClick={() => handleBlogLike(blog)}
				>
					Like
				</button>
				{blog.user.username === user.username && (
					<div>
						<button
							className="removeButton"
							onClick={() => handleBlogDelete(blog)}
						>
							Remove
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default BlogInfo
