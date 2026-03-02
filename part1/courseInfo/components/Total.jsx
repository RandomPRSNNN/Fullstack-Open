const Total = (props) => {
    let total = 0
    props.parts.forEach(item => total += item.exercises)

    return (
        <p>Number of exercises: {total}</p>
    )
}

export default Total