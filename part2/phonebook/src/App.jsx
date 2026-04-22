import { useState, useEffect } from 'react'
import axios from 'axios'
import PhonebookView from './components/PhonebookView'
import PhoneNumberForm from './components/PhoneNumberForm'
import FilterSearch from './components/FilterSearch'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifVal, setNotifVal] = useState('default notification value')
  const [notifStatus, setNotifStatus] = useState('notifSuccess')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleDelete = id => {
    if(confirm(`Delete ${(persons.find(person => person.id === id)).name}?`)){
      personService
      .deletePerson(id)
      .then(data => {
        console.log(data)
        setPersons(persons.filter(item => item.id != id))
      })
    }
    
  }

  const appendEntry = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)){
      const inputTemp = persons.find(person => person.name === newName)

      //Review this part again 2.15 - might want to clean up code? 
      if(inputTemp.number === newNumber){
        alert(`${newName} is already in Book and the Number is the Same`)
      } else if (confirm(`${newName} is already in Book. Do you want to replace their number?`)){
        personService
        .update(inputTemp.id, { ...inputTemp, number: newNumber})
        .then(response => {
          setPersons(persons.map(person => person.id === inputTemp.id ? response : person))

          //2.16
          setNotifVal(`${inputTemp.name}'s Number Updated`)
          setTimeout(() => {
            setNotifVal('default notification value')
          }, 5000)
        })
        .catch(error => {
          setNotifVal(`Information of ${inputTemp.name} has already been removed from the server`)
          setNotifStatus('notifError')
          setTimeout(() => {
            setNotifVal('default notification value')
            setNotifStatus('notifSuccess')
          }, 5000)

        })
      }
    } else{
      personService
      .create({name: newName, number: newNumber, id:persons.length + 1})
      .then(person => {
        setPersons(persons.concat(person))

        //2.16
        setNotifVal(`Added ${person.name}`)
        setTimeout(() => {
            setNotifVal('default notification value')
          }, 5000)
      })
    }
  }

  useEffect(() => {
    personService
    .getAll()
    .then(list => {setPersons(list)})
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      
      <div className={notifStatus}>{notifVal}</div>
      <FilterSearch filter={newFilter} filterHandler={handleFilterChange}/>
      <PhoneNumberForm append={appendEntry} name={newName} nameHandler={handleNameChange} number={newNumber} numberHandler={handleNumberChange}/>
      <PhonebookView list={persons} filterReq={newFilter} deleteHandler={handleDelete}/>
    </div>
  )
}

export default App