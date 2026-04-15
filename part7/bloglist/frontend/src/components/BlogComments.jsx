import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const BlogComments = ({ blog }) => {
	const dispatch = useDispatch()
	const [content, setContent] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!content.trim()) return
		dispatch(addComment(blog, content))
		setContent('')
	}

	return (
		<Box>
			<Typography variant="h6">Comments</Typography>
			<List>
				{blog.comments.map((comment) => (
					<ListItem key={comment.id}>
						<ListItemText primary={comment.content} />
					</ListItem>
				))}
			</List>
			<Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', gap: 1 }}>
				<TextField
					fullWidth
					size="small"
					placeholder="Write a comment..."
					value={content}
					onChange={({ target }) => setContent(target.value)}
					variant="outlined"
				/>
				<Button type="submit" variant="contained">
					Add
				</Button>
			</Box>
		</Box>
	)
}

export default BlogComments
