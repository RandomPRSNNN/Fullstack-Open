import { useState } from "react"
import blogService from '../services/blogs'

const Create = ({ setNotificationText, setBlogs, blogs, toggleHide, createBlog }) => {
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

        if(createBlog)//for testing
        {
            return createBlog(newBlog)
        }

        const result = await blogService.create(newBlog)
        setAuthor('')
        setTitle('')
        setUrl('')
        setBlogs(blogs.concat(result))
        setNotificationText(`New blog created: ${title} by ${author}`)
        toggleHide()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create New</h3>
            <label>Title
                <input 
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}></input>
            </label>
            <label>Author
                <input 
                    placeholder="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}></input>
            </label>
            <label>URL
                <input 
                    placeholder="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}></input>
            </label>
            <button type="submit">Create</button>
        </form>
    )
}

export default Create