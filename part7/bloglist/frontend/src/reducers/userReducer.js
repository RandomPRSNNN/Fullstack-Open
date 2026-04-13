import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { displayNotification } from './notificationReducer'

const userSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
		setUser(state, action) {
			return action.payload
		},
		logOutUser(state, action) {
			return {}
		},
	},
})

export const { logOutUser } = userSlice.actions
const { setUser } = userSlice.actions

export const logInUser = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			dispatch(setUser(user))
			window.localStorage.setItem(
				'loggedBlogAppUser',
				JSON.stringify(user),
			)
		} catch (error) {
			dispatch(displayNotification(error.response.data.error))
		}
	}
}

export const reloadUserData = () => {
	return async (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			blogService.setToken(user.token)
			dispatch(setUser(user))
		}
	}
}

export default userSlice.reducer
