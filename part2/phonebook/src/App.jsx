import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterList, setFilterList] = useState([])

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

    const newInputPerson = { name: newName, number: newPhone, id: persons.length + 1 }

    setPersons(persons.concat(newInputPerson))
    setNewName('')
    setNewPhone('')
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneInput = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilterList(filteredPersons)
  }

  const listToShow = filterList.length > 0 ? filterList : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Filter to show with <input onChange={handleFilterChange} /></p>
      <br />
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

      <h2>Numbers</h2>
      <ul>
        {listToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App