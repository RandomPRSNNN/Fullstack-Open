import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '../services/users'

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload
		},
	},
})

export const { setUsers } = usersSlice.actions

export const initUsers = () => {
	return async (dispatch) => {
		const serverUsers = await getAllUsers()
		dispatch(setUsers(serverUsers))
	}
}

export default usersSlice.reducer
