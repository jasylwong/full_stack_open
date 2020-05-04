import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value)
  }

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(resolve => {
      setCountries(resolve.data)
    })
  }
  useEffect(hook, [])
  console.log(countries)


  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      {countries.map(country => <div key={countries.indexOf(country)}>{country.name}</div>)}
    </div>
  )
}

export default App;
