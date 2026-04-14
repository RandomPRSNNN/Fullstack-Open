import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const BlogComments = ({ blog }) => {
	const dispatch = useDispatch()
	const [content, setContent] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		dispatch(addComment(blog, content))
		setContent('')
	}
	return (
		<div>
			<div className="boldText">Comments</div>
			<ul>
				{blog.comments.map((comment) => (
					<li key={comment.id}>{comment.content}</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<input
					name="content"
					onChange={({ target }) => setContent(target.value)}
					placeholder="comment"
					value={content}
				></input>
				<button type="submit">submit</button>
			</form>
		</div>
	)
}

export default BlogComments
