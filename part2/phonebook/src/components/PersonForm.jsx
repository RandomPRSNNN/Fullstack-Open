import personService from '../services/persons'

const PersonForm = ({ newName, newPhone, setNewName, persons, setPersons, setNewPhone }) => {

    const handleNameInput = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneInput = (event) => {
        setNewPhone(event.target.value)
    }

    const updatePersonsNumber = () => {
        const personToUpdate = persons.find(user => user.name.toLowerCase() === newName.toLowerCase())
        const updatedPersonNumber = { ...personToUpdate, number: newPhone }
        personService.update(personToUpdate.id, updatedPersonNumber)
            .then(response => {
                const updatePersonList = persons.map(person => person.id === response.id ? updatedPersonNumber : person)
                setPersons(updatePersonList)
                setNewName('')
                setNewPhone('')
            })
    }

    const addNewPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
            const confirmNumberUpdate = window.confirm(`${newName} is already in the phonebook, update the number instead?`);
            if (confirmNumberUpdate) {
                updatePersonsNumber()
            }
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