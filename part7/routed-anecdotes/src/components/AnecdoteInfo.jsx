const AnecdoteInfo = ({ anecdote }) => {
    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            Has <strong>{anecdote.votes} </strong> votes <br/>
            For more information: <a target="_blank" rel="noreferrer" href={anecdote.info}>{anecdote.info}</a>
        </div>
    )
}

export default AnecdoteInfo