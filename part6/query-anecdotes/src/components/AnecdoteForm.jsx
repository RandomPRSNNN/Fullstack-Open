import { newAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {
  const { setNotification } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdotesMutation = useMutation({
    mutationFn: newAnecdote,
    onSuccess: (createdAnecdote) => {
      const currentAnecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], currentAnecdotes.concat(createdAnecdote))
      setNotification(`Created: ${createdAnecdote.content}`)
    },
    onError: (error) => {
      setNotification(error.message)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    newAnecdotesMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm