import './index.css'
import { Route, Routes } from 'react-router'
import HomePage from './components/HomePage'
import UserPage from './components/UserPage'
import NavBar from './components/NavBar'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import Notification from './components/Notification'

const App = () => {
	return (
		<>
			<NavBar />
			{/* <Notification /> */}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/users" element={<UserPage />} />
				<Route path="/users/:id" element={<UserInfo />} />
				<Route path="/blogs/:id" element={<BlogInfo />} />
			</Routes>
		</>
	)
}

export default App
