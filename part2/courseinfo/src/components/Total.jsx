const Total = ({ parts }) => {
    const total = parts.reduce((accumilator, part) => {
        return accumilator + part.exercises
    }, 0)

    return (
        <p>Total number of courses {total}</p>
    )
}

export default Total