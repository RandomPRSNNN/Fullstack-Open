import { Link } from 'react-router'
import { Paper, Typography, ListItemButton, Box } from '@mui/material'

const Blog = ({ blog }) => {
	if (!blog) return null

	return (
		<Paper
			variant="outlined"
			sx={{
				overflow: 'hidden',
				transition: '0.2s',
				'&:hover': { backgroundColor: '#f0f7f0' },
			}}
		>
			<ListItemButton component={Link} to={`/blogs/${blog.id}`} sx={{ p: 2 }}>
				<Box>
					<Typography variant="body1" sx={{ fontWeight: 300, color: '#2e7d32' }}>
						{blog.title}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						by {blog.author}
					</Typography>
				</Box>
			</ListItemButton>
		</Paper>
	)
}

export default Blog
