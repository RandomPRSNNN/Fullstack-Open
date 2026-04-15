import { Container, Typography, Divider, List, ListItem, ListItemText, Paper } from '@mui/material'
import { UserTableStyles } from '../styles/UserPage.styles'
import { useParams, Link } from 'react-router'
import { useSelector } from 'react-redux'

const UserInfo = () => {
	const { id } = useParams()
	const users = useSelector((state) => state.users)
	const user = users.find((u) => u.id === id)

	if (!user) return null

	return (
		<Container maxWidth="md" sx={UserTableStyles.container}>
			<Typography variant="h4" gutterBottom sx={UserTableStyles.header}>
				{user.name}
			</Typography>
			<Typography variant="h6" color="textSecondary">
				Added Blogs
			</Typography>
			<Divider sx={{ mb: 3 }} />

			{user.blogs.length ? (
				<Paper elevation={2}>
					<List>
						{user.blogs.map((blog) => (
							<ListItem key={blog.id} divider>
								<ListItemText>
									<Link to={`/blogs/${blog.id}`} style={UserTableStyles.link}>
										{blog.title}
									</Link>
								</ListItemText>
							</ListItem>
						))}
					</List>
				</Paper>
			) : (
				<Typography variant="body1">None created by user</Typography>
			)}
		</Container>
	)
}

export default UserInfo
