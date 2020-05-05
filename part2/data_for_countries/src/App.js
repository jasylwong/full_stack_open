import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './components/Results';
require('dotenv').config();

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const showCountry = (country) => {
    setSearch(country.name)
  }

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(resolve => {
      setCountries(resolve.data)
    })
  }
  useEffect(hook, [])

  const filteredCountries = 
    ( search === ''
      ? countries
      : countries.filter(country => 
        country.name.toLowerCase().includes(search.toLowerCase()))
    )

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <Results countries={filteredCountries} showCountry={showCountry} />
    </div>
  )
}

export default App;
