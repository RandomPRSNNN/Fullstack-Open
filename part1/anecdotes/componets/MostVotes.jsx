const MostVotes = ({ votes, anecdotes }) => {
    const mostVoted = () => {
        let mostVoted = 0;

        for (let i = 1; i < votes.length; i++) {
            if (votes[i] > votes[mostVoted]) {
                mostVoted = i;
            }
        }

        if (votes[mostVoted] === 0 && mostVoted === 0) {
            return (<p>No votes yet.</p>);
        }
        else {
            return (<p>{anecdotes[mostVoted]}<br /> has {votes[mostVoted]} votes</p>);
        }
    }


    return (
        <div>
            <h1>Anecdote with most votes</h1>
            {mostVoted()}
        </div>
    )
}

export default MostVotes