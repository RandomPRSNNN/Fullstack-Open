import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../reducers/userReducer'
import { Link } from 'react-router'
import Notification from './Notification'

const NavBar = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	const logOut = () => {
		window.localStorage.clear()
		window.location.reload()
		dispatch(logOutUser())
	}

	if (!user.username) return

	return (
		<div className="navContainer">
			<Link className="navItem navLink" to="/">
				Blogs
			</Link>
			<Link className="navItem navLink" to="/users">
				Users
			</Link>
			<div className="navItem boldText">
				{user.name} is logged in
				<button className="logout-button" onClick={() => logOut()}>Logout</button>
			</div>
			<div className='navItem'>
				<Notification/>
			</div>
		</div>
	)
}

export default NavBar
