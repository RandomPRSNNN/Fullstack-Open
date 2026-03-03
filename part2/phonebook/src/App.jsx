import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterList, setFilterList] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
    })
  }, [])

  const listToShow = filterList.length > 0 ? filterList : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFilterList={setFilterList} />
      <h3>Add new</h3>
      <PersonForm newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone} persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons listToShow={listToShow} />
    </div>
  )
}

export default App