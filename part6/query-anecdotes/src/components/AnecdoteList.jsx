import { useQueryClient, useMutation } from "@tanstack/react-query"
import { updateAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteList = ({ anecdotes }) => {
    const queryClient = useQueryClient()
    const { setNotification } = useContext(NotificationContext)

    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (newAnecdote) => {
            const currentAnecdotes = queryClient.getQueryData(['anecdotes'])

            const updatedList = currentAnecdotes.map(a => a.id === newAnecdote.id ? newAnecdote : a)
            queryClient.setQueryData(['anecdotes'], updatedList)
            setNotification(`You have voted for: ${newAnecdote.content}`)
        }
    })

    const handleVote = (anecdote) => {
        voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList