import { reloadUserData } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'
import BlogList from './BlogList'
import Login from './Login'

const HomePage = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(reloadUserData())
	}, [])

	return <div>{!user.username ? <Login /> : <BlogList />}</div>
}

export default HomePage
