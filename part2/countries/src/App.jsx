import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const showCountry = (country) => {
    setSearch(country.name.common)
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      find countries
      <input onChange={handleSearchChange} />
      <Countries countries={countriesToShow} showCountry={showCountry}/>
    </div>
  )
}

export default App
