import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { initUsers } from '../reducers/usersReducer'
import { Link } from 'react-router'

const UserPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((state) => state.user)
	const users = useSelector((state) => state.users)

	useEffect(() => {
		if (!user.username) {
			navigate('/')
			return
		}
        dispatch(initUsers())
	}, [dispatch, navigate, user.username])

	return (
		<div>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>
									{user.name}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default UserPage
