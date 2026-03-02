import StatisticLine from "./StatisticLine";

const Statistics = ({ good, bad, neutral }) => {
    let total = good + bad + neutral;
    let average = total === 0 ? 0 : (good - bad) / total;
    let positivePercentage = total === 0 ? 0 : (good / total) * 100;

    if (total === 0) return (<p>No feedback given yet</p>);

    return (
        <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text="Good" value={good} />
                    <StatisticLine text="Neutral" value={neutral} />
                    <StatisticLine text="Bad" value={bad} />
                    <StatisticLine text="Total" value={total} />
                    <StatisticLine text="Average" value={average} />
                    <StatisticLine text="Positive" value={positivePercentage} percentage={true}/>
                </tbody>
            </table>
        </div>
    )
}

export default Statistics