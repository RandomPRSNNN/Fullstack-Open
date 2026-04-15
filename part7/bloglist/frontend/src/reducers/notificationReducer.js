import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notificationText',
	initialState: {
		text: '',
	},
	reducers: {
		setText(state, action) {
			state.text = action.payload
		},
		clearText(state, action) {
			state.text = ''
		},
	},
})

const { setText, clearText } = notificationSlice.actions

let timerId

export const displayNotification = (text) => {
	return (dispatch) => {
		if (timerId) timerId = null
		dispatch(setText(text))

		timerId = setTimeout(() => {
			dispatch(clearText())
		}, 5000)
	}
}

export default notificationSlice.reducer
