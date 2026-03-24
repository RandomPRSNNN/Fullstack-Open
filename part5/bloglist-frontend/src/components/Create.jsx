import { useState } from "react"
import blogService from '../services/blogs'

const Create = ({ user, setBlogs, blogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newBlog = {
            "title": title,
            "author": author,
            "url": url
        }

        const result = await blogService.create(newBlog)
        setBlogs(blogs.concat(result))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create New</h3>
            <label>Title
                <input onChange={(e) => setTitle(e.target.value)}></input>
            </label>
            <label>Author
                <input onChange={(e) => setAuthor(e.target.value)}></input>
            </label>
            <label>URL
                <input onChange={(e) => setUrl(e.target.value)}></input>
            </label>
            <button type="submit">Create</button>
        </form>
    )
}

export default Create