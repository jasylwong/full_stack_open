import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    personService.getAll().then(resolve => {
      setPersons(resolve.data)
    })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else if (persons.map(person => person.number).includes(newNumber)) {
      window.alert(`${newNumber} is already used by someone else`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService.create(newPerson)
        
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = 
    ( filter === ''
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filter))
    )

  const deletePerson = (person) => {
    personService.remove(person)
    const newPersons = persons.filter(p => p.id !== person.id)
    setPersons(newPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <Form addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        filteredPersons={filteredPersons} 
        persons={persons} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App;
