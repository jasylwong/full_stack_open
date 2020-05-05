import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from 'react-dom';

const Results = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return countries.map(country => 
      <div key={countries.indexOf(country)}>{country.name}</div>)
  } else if (countries.length === 1) {
    return (
      <div>
        <h2>{countries[0].name}</h2>
        <div>capital {countries[0].capital}</div>
        <div>population {countries[0].population}</div>
        <h3>Languages</h3>
        <ul>
          {countries[0].languages.map(language => 
            <li key={countries[0].languages.indexOf(language)}>{
              language.name}
            </li>)}
        </ul>
        <img src={countries[0].flag} width='100px' alt={countries[0].name}/>
      </div>
    )
  } else {
    return <div></div>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
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
      <Results countries={filteredCountries} />
    </div>
  )
}

export default App;
