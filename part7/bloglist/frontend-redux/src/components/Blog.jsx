import { Link } from 'react-router'

const Blog = ({ blog }) => {
	return (
		<>
			{blog && (
				<div className="blog">
					<Link to={`/blogs/${blog.id}`}>
						{blog.title} by {blog.author}
					</Link>
				</div>
			)}
		</>
	)
}

export default Blog
