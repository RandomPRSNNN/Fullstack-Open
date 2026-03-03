const Filter = ({persons, setFilterList}) => {

    const handleFilterChange = (event) => {
        let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilterList(filteredPersons)
    }

    return (
        <p>Filter to show with <input onChange={handleFilterChange} /></p>
    )
}

export default Filter