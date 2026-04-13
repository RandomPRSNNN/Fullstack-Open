import { displayNotification } from '../reducers/notificationReducer'
import { removeBlog, handleLike } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import BlogService from '../services/blogs'

const Blog = ({ blog, handleBlogLike: passedLikeHandler }) => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const [showDetails, setShowDetails] = useState(false)

	const toggleVisibility = () => {
		setShowDetails(!showDetails)
	}

	//for testing
	const handleLikeClick = () => {
		if (passedLikeHandler) {
			passedLikeHandler(blog)
		} else {
			handleBlogLike(blog)
		}
	}

	const handleBlogLike = async (blog) => {
		dispatch(handleLike(blog))
		dispatch(displayNotification(`Blog liked: ${blog.title}`))
	}

	const handleBlogDelete = async (blog) => {
		if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)) {
			const response = await BlogService.remove(blog)

			if (response.status === 204) {
				dispatch(removeBlog(blog))
				dispatch(displayNotification('Blog deleted'))
			}
		}
	}

	return (
		<>
			{blog && (
				<div className="blog">
					{blog.title} by {blog.author}
					<button onClick={() => toggleVisibility()}>
						{showDetails ? 'hide' : 'view'}
					</button>
					{showDetails && (
						<div>
							<div>
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
							</div>
							<div>Created by {blog.user.name}</div>
							<div>
								<div className="likes-count">{blog.likes}</div>
								<button
									className="likeButton"
									onClick={() => handleLikeClick(blog)}
								>
									Like
								</button>
							</div>

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
					)}
				</div>
			)}
		</>
	)
}

export default Blog
