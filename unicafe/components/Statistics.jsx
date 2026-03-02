const Statistics = ({good, bad, neutral}) => {
    let total = good + bad + neutral;
    let average = total === 0 ? 0 : (good - bad) / total;
    let positivePercentage = total === 0 ? 0 : (good / total) * 100;

    if (total === 0) return (<p>No feedback given yet</p>);
    
    return (
        <div>
            <h2>Statistics</h2>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
            <br/>
            <p>Total {total}</p>
            <p>Average {average}</p>
            <p>Positive {positivePercentage}%</p>
        </div>
    )
}

export default Statistics