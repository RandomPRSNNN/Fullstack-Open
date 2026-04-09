import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ createNewAnecdote, displayNotification }) => {
  const navigate = useNavigate()
  const content = useField('content')
  const author = useField('text')
  const info = useField('text')
  const {reset: contentReset, ...contentInput} = content
  const {reset: authorReset, ...authorInput} = author
  const {reset: infoReset, ...infoInput} = info

  const getID = () => {
    return Math.floor(Math.random() * 5000) + 1
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createNewAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0, id: getID() })
    displayNotification(`New anecdote created: ${content.value}`)
    navigate('/')
  }

  const handleReset = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...contentInput} />
        </div>
        <div>
          author
          <input {...authorInput} />
        </div>
        <div>
          url for more info
          <input {...infoInput} />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  )
}

export default CreateNew
