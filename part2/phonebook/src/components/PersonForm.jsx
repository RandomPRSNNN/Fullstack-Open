import personService from '../services/persons'

const PersonForm = ({ newName, newPhone, setNewName, persons, setPersons, setNewPhone }) => {

    const handleNameInput = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneInput = (event) => {
        setNewPhone(event.target.value)
    }

    const addNewPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        else if (persons.some(person => person.number === newPhone)) {
            alert(`${newPhone} is already added to phonebook`)
            return
        }

        const newPerson = { name: newName, number: newPhone }
        personService.create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewPhone('')
            })
    }

    return (
        <form onSubmit={addNewPerson}>
            <div>
                name: <input value={newName} onChange={handleNameInput} />
            </div>
            <div>
                phone: <input value={newPhone} onChange={handlePhoneInput} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm