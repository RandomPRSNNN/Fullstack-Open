import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		updateBlog(state, action) {
			return state.map((m) =>
				m.id === action.payload.id ? action.payload : m,
			)
		},
		removeBlog(state, action) {
			return state.filter((blog) => blog.id !== action.payload.id)
		},
		addBlog(state, action) {
			return [...state, action.payload]
		},
	},
})

export const { removeBlog } = blogSlice.actions
const { setBlogs, updateBlog, addBlog } = blogSlice.actions

export const initBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createNew = (blog) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(blog)
		dispatch(addBlog(newBlog))
	}
}

export const handleLike = (likedBlog) => {
	return async (dispatch) => {
		const blog = { ...likedBlog, likes: likedBlog.likes + 1 }
		const updatedBlog = await blogService.update(blog)
		dispatch(updateBlog(updatedBlog))
	}
}

export const addComment = (blog, comment) => {
	return async (dispatch) => {
		const serverBlog = await blogService.addComment(blog, comment)
		dispatch(updateBlog(serverBlog))
	}
}

export default blogSlice.reducer
