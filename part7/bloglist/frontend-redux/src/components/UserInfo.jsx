import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

const UserInfo = () => {
	const { id } = useParams()
	const users = useSelector((state) => state.users)
	const user = users.find((u) => u.id === id)

	if (!user) return null

	return (
		<div>
			<h1>{user.name}</h1>
			{user.blogs.length ? (
				<ul>
					{user.blogs.map((blog) => (
						<li key={blog.id}>{blog.title}</li>
					))}
				</ul>
			) : (
				<div>None created by user</div>
			)}
		</div>
	)
}

export default UserInfo
