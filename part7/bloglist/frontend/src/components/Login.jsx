import { displayNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { logInUser } from '../reducers/userReducer'

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
			//NOT WORKING
			dispatch(displayNotification(error.response))
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<h3>Please login</h3>
			<label>
				username
				<input onChange={(e) => setUsername(e.target.value)}></input>
			</label>
			<br />
			<label>
				password
				<input onChange={(e) => setPassword(e.target.value)}></input>
			</label>
			<br />
			<button type="submit">Login</button>
		</form>
	)
}

export default Login
