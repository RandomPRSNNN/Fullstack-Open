const StatisticLine = ({ text, value, percentage=false}) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}{percentage ? '%' : ''}</td>
            </tr>
        </>
    )
}

export default StatisticLine