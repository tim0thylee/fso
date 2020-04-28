import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
         .then(response => setPersons(response.data))
  },[])

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const onSubmitName = event => {
    event.preventDefault();
    const alreadyExists = persons.some(person => person.name === newName)
    if (alreadyExists) {
        alert(`${newName} already exists in the found book`)
    } else {
        const newPerson = {name: newName, number: newNumber}
        setPersons([...persons, newPerson])
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
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App