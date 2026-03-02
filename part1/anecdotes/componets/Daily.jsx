const Daily = ({ votes, anecdotes, selected, setSelected, setVotes }) => {
    const displayNext = () => {
        let nextNumber
        do {
            nextNumber = Math.floor(Math.random() * anecdotes.length)
        } while (nextNumber === selected) //prevent the same anecdoate showing up twice

        setSelected(nextNumber);
    }

    const vote = () => {
        let copy = [...votes]
        copy[selected] += 1
        setVotes(copy);
    }

    return (
        <div>
            <h1>Anecdote of the Day</h1>
            <p>{anecdotes[selected]}</p>
            Has {votes[selected]} votes.
            <br />
            <button onClick={displayNext}>Next anecdote</button>
            <button onClick={vote}>Vote</button>
        </div>
    )
}

export default Daily