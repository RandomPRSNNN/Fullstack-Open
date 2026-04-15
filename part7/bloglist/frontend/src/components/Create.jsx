import { Modal, Box, Typography, TextField, Button, Stack, Divider } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { CreateStyles } from '../styles/Create.styles'

const Create = ({ open, handleClose }) => {
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		const newBlog = { title, author, url }

		dispatch(createNew(newBlog))
		dispatch(displayNotification(`New blog created: ${title} by ${author}`))

		setTitle('')
		setAuthor('')
		setUrl('')
		handleClose()
	}

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={CreateStyles}>
				<Typography variant="h6">New Blog</Typography>
				<Divider sx={{ mb: 2 }} />
				<form onSubmit={handleSubmit}>
					<Stack spacing={2}>
						<TextField
							label="Title"
							placeholder="Title"
							fullWidth
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<TextField
							label="Author"
							placeholder="Author"
							fullWidth
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
						/>
						<TextField
							label="URL"
							placeholder="url"
							fullWidth
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
						<Button type="submit" variant="contained" fullWidth>
							Create
						</Button>
					</Stack>
				</form>
			</Box>
		</Modal>
	)
}

export default Create
