import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (!filter) {
            return [...anecdotes].sort((a, b) => b.votes - a.votes)
        }
        else {
            return anecdotes.filter(anecdote =>
                anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        }
    })
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList