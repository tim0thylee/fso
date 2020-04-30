import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialList => setPersons(initialList))
  },[])

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const onSubmitName = event => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
        const allowUpdate = window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)
        if (allowUpdate) {
          const changedNumber = {...existingPerson, number: newNumber}
          personsService
            .update(existingPerson.id, changedNumber)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            })
          setNewName('')
          setNewNumber('')
        }
    } else {
        const newPerson = {name: newName, number: newNumber}
        personsService
             .create(newPerson)
             .then(returnedPerson => {
              setPersons([...persons, returnedPerson])
             })
        setNewName('')
        setNewNumber('')
    }
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value.toLowerCase())
  }

  const handleDelete = (id, name) => {
    const allowDelete = window.confirm(`Delete ${name}`)
    if (allowDelete) {
      personsService
           .deleteObject(id)
           .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
        onSubmitName={onSubmitName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleDelete={handleDelete}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} filter={filter}/>
    </div>
  )
}

export default App