import { useState, useEffect } from 'react'
import CountrySearch from './components/CountrySearch'
import CountryView from './components/CountryView'
import countriesService from './services/countries'


function App() {
  const [count, setCount] = useState(0)
  const [countryCheck, setCountryCheck] = useState('')
  const [countryListAll, setCountryList] = useState([])
  const [filteredCountryList, setFilteredCountryList] = useState([])
  
  
  const handleButtons = (Country) => {
    const countryName = new RegExp(Country, "i")
    setFilteredCountryList(countryListAll.filter(item => countryName.test(item.name.common)))
  }

  const handleCountrySearch = (event) => {
    setCountryCheck(event.target.value)
    const regExVar = new RegExp(event.target.value, "i")
    setFilteredCountryList(countryListAll.filter(item => regExVar.test(item.name.common)))
  }

  useEffect(() => {
    countriesService
    .getAll()
    .then(list => {setCountryList(list)})
  }, [])

  return (
    <div>
      <CountrySearch search={countryCheck} searchHandler={handleCountrySearch} />
      <CountryView countryList={filteredCountryList} buttonHandler={handleButtons}/>
    </div>
  )
}

export default App
