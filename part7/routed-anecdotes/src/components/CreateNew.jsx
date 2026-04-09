import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateNew = ({ createNewAnecdote, displayNotification }) => {
  const navigate = useNavigate()
  const [info, setInfo] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const getID = () => {
    return Math.floor(Math.random() * 5000) + 1
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createNewAnecdote({ content, author, info, votes: 0, id: getID() })
    displayNotification(`New anecdote created: ${content}`)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew
