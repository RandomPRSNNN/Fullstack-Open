import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { NotificationContextProvider } from './NotificationContext'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (result.isLoading) {
    return <div>Loading....</div>
  }
  if (result.isError) {
    return <div>Anecdote service is unavailable due to server issues</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContextProvider>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </NotificationContextProvider>
  )
}

export default App