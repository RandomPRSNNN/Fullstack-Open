import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import { navStyles } from '../styles/NavBar.styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { logOutUser } from '../reducers/userReducer'
import { useState } from 'react'
import Create from './Create'

const NavBar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((state) => state.user)
	const [createModalOpen, setCreateModalOpen] = useState(false)

	const logOut = () => {
		window.localStorage.clear()
		dispatch(logOutUser())
		navigate('/')
	}

	if (!user.username) return null

	return (
		<>
			<AppBar position="static" sx={navStyles.appBar}>
				<Toolbar sx={navStyles.toolbar}>
					<Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
						<Button component={Link} to="/" sx={navStyles.linkButton}>
							Blogs
						</Button>
						<Button component={Link} to="/users" sx={navStyles.linkButton}>
							Users
						</Button>
						<Button sx={navStyles.linkButton} onClick={() => setCreateModalOpen(true)}>
							Create Blog
						</Button>
					</Box>

					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Typography variant="body2">{user.name} logged in</Typography>
						<Button
							variant="outlined"
							size="small"
							onClick={logOut}
							sx={navStyles.logoutButton}
						>
							Logout
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Create open={createModalOpen} handleClose={() => setCreateModalOpen(false)} />
		</>
	)
}

export default NavBar
