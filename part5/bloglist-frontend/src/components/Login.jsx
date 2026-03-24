import { useState } from "react"
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setNotificationText }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            setNotificationText(error.response.data.error)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <h3>Please login</h3>
            <label>username
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