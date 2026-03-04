import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterList, setFilterList] = useState([])
  const [notification, setNotificationText] = useState(null)
  const [notificationError, setNotificationError] = useState(false)

  const setNotification = (text, error = false) => {
    setNotificationText(text)
    setNotificationError(error)

    setTimeout(() => {
      setNotificationText(null)
    }, 5000)
  }


  useEffect(() => {
    personServices.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const listToShow = filterList.length > 0 ? filterList : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification}
        notificationError={notificationError} />
      <Filter
        persons={persons}
        setFilterList={setFilterList} />
      <h3>Add new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification} />
      <h3>Numbers</h3>
      <Persons
        listToShow={listToShow}
        setPersons={setPersons}
        setNotification={setNotification} />
    </div>
  )
}

export default App