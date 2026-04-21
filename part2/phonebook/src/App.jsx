import { useState } from 'react'
import PhonebookView from './components/PhonebookView'
import PhoneNumberForm from './components/PhoneNumberForm'
import FilterSearch from './components/FilterSearch'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const appendName = (event) => {
    event.preventDefault()
    if(persons.find(persons => persons.name === newName)){
      alert(`${newName} is already in Book`)
    } else{
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }

  return (
    <div>
      <FilterSearch filter={newFilter} filterHandler={handleFilterChange}/>
      <PhoneNumberForm append={appendName} name={newName} nameHandler={handleNameChange} number={newNumber} numberHandler={handleNumberChange}/>
      <PhonebookView list={persons} filterReq={newFilter}/>
    </div>
  )
}

export default App