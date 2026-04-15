import { displayNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { logInUser } from '../reducers/userReducer'
import { Container, Box, Stack, TextField, Button, Card, CardContent } from '@mui/material'

const Login = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			dispatch(logInUser(username, password))
			setUsername('')
			setPassword('')
		} catch (error) {
			dispatch(displayNotification(error.response))
		}
	}

	return (
		<Container maxWidth="xs" sx={{ mt: 8 }}>
			<Card variant="outlined">
				<CardContent sx={{ p: 4 }}>
					<Box component="form" onSubmit={handleLogin} noValidate>
						<Stack spacing={3}>
							<TextField
								label="Username"
								variant="outlined"
								fullWidth
								onChange={(e) => setUsername(e.target.value)}
							/>
							<TextField
								label="Password"
								type="password"
								variant="outlined"
								fullWidth
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button type="submit" variant="contained" size="large" fullWidth>
								Login
							</Button>
						</Stack>
					</Box>
				</CardContent>
			</Card>
		</Container>
	)
}

export default Login
