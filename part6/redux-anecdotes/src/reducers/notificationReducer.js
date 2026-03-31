import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { 
        text: '', 
        view: false 
    },
    reducers: {
        setNotification(state, action) {
            state.text = action.payload
            state.view = true
        },
        clearNotification(state) {
            state.text = ''
            state.view = false
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer