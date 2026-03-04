import personService from '../services/persons'

const Persons = ({ listToShow, setPersons }) => {

    const handleDelete = (event) => {
        const confirmed = window.confirm(`Delte ${event.target.name}?`);
        if (confirmed) {
            personService.remove(event.target.id)
                .then(response => {
                    setPersons(listToShow.filter(person => person.id !== response.id))
                })
        }
    }

    return (
        <ul>
            {listToShow.map(person =>
                <li key={person.id}>{person.name} {person.number}
                    <button onClick={handleDelete} id={person.id} name={person.name}>Delete</button>
                </li>)}
        </ul>
    )
}



export default Persons