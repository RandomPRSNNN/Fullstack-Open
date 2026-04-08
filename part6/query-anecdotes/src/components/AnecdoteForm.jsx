import { newAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdotesMutation = useMutation({
    mutationFn: newAnecdote,
    onSuccess: (newAnecdote) => {
      const currentAnecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], currentAnecdotes.concat(newAnecdote))
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