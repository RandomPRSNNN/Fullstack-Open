const Statistics = ({good, bad, neutral}) => {
    return (
        <div>
            <h2>Statistics</h2>
            <p>Good {good}</p>
            <p>Bad {bad}</p>
            <p>Neutral {neutral}</p>
        </div>
    )
}

export default Statistics