import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router'
import { useEffect } from 'react'
import { initUsers } from '../reducers/usersReducer'
import { UserTableStyles } from '../styles/UserPage.styles'
import {
	Container,
	Typography,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material'

const UserPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((state) => state.user)
	const users = useSelector((state) => state.users)

	useEffect(() => {
		if (!user.username) {
			navigate('/')
		}
		dispatch(initUsers())
	}, [dispatch, navigate, user.username])

	return (
		<Container maxWidth="md" sx={UserTableStyles.container}>
			<Typography variant="h4" gutterBottom sx={UserTableStyles.header}>
				Users
			</Typography>
			<Divider sx={{ mb: 2}} />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow sx={UserTableStyles.tableHead}>
							<TableCell sx={UserTableStyles.tableHeaderCell}>Name</TableCell>
							<TableCell align="right" sx={UserTableStyles.tableHeaderCell}>
								Blogs Created
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((u) => (
							<TableRow key={u.id} hover>
								<TableCell>
									<Link to={`/users/${u.id}`} style={UserTableStyles.link}>
										{u.name}
									</Link>
								</TableCell>
								<TableCell align="right">{u.blogs.length}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default UserPage
