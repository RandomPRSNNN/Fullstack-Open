import { Container, Stack, Typography, Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs)
	const mostLikedFirst = [...blogs].sort((a, b) => b.likes - a.likes)

	return (
		<Container maxWidth="md">
			<Typography variant="h4">Blogs</Typography>
			<Divider sx={{ mb: 2 }} />

			<Stack spacing={1}>
				{mostLikedFirst.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</Stack>
		</Container>
	)
}

export default BlogList
