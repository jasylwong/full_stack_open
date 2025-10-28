import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    personService.getAll()
      .then(response => setPersons(response.data))
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()

    const existing_person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (existing_person) {
      if (window.confirm(`${existing_person.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService.update(existing_person.id, { ...existing_person, number: newNumber }).then(response => {
          setPersons(persons.map(p => p.id === existing_person.id ? { ...existing_person, number: newNumber} : p))
          setNewName('')
          setNewNumber('')
          setNotification({ message: `Number changed for ${existing_person.name}` })
        })
        setTimeout(() => {
          setNotification({ message: null })
        }, 5000)
      }
    } else {
      const new_person = { name: newName, number: newNumber }
      personService.create(new_person)
        .then(response => {        
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotification({ message: `Added ${newName}` })
        })
        .catch(error => {
          setNotification({ message: error.response.data.error, isError: true })
        })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const deletePersonOf = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id).then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        setNotification({ message: `Information of '${person.name}' has already been removed from server`, isError: true })
        setTimeout(() => {
          setNotification({ message: null })
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePersonOf}/>
    </div>
  )
}

export default App