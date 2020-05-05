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
    const newPerson = { name: newName, number: newNumber }

    if (persons.map(person => person.name).includes(newName)) {
      const findId = persons.find(p => p.name === newName).id
      personService.update(findId, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== findId ? p : returnedPerson))
        })
    } else if (persons.map(person => person.number).includes(newNumber)) {
      window.alert(`The number '${newNumber}' is already used by someone else`)
    } else {
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
    // if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person)
      // .catch(error => {
        //   window.alert(`${person.name} deleted`)
        // })
      const newPersons = persons.filter(p => p.id !== person.id)
      setPersons(newPersons)
    // }
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
