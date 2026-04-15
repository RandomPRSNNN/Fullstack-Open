import { Container, Paper, Typography, Button, Box, Divider, Stack } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { displayNotification } from '../reducers/notificationReducer'
import { removeBlog, handleLike } from '../reducers/blogReducer'
import BlogComments from './BlogComments'
import BlogService from '../services/blogs'

const BlogInfo = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)
	const blog = blogs.find((b) => b.id === id)

	if (!blog) return null

	const blogUrl = blog.url.startsWith('http') ? blog.url : `https://${blog.url}`

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

	return (
		<Container maxWidth="md">
			<Paper variant="outlined" sx={{ p: 4 }}>
				<Typography variant="h4">{blog.title}</Typography>
				<Typography variant="subtitle1">
					by <strong>{blog.author}</strong>
				</Typography>
				<Box sx={{ mb: 3 }}>
					<a href={blogUrl} target="_blank" rel="noreferrer">
						{blogUrl}
					</a>
					<Typography variant="subtitle1">Added by {blog.user.name}</Typography>
				</Box>
				<Stack direction="row" spacing={1}>
					<Typography variant="h6">{blog.likes} likes</Typography>
					<Button variant="contained" size="small" onClick={() => handleBlogLike(blog)}>
						Like
					</Button>
					{blog.user.username === user.username && (
						<Button
							color="error"
							variant="outlined"
							size="small"
							onClick={() => handleBlogDelete(blog)}
						>
							Remove Blog
						</Button>
					)}
				</Stack>
				<Divider sx={{ mb: 1, borderColor: 'transparent' }} />
				<Divider sx={{ mb: 2 }} />
				<BlogComments blog={blog} />
			</Paper>
		</Container>
	)
}

export default BlogInfo
