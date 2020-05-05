import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return (
      countries.map(country => 
        <div key={countries.indexOf(country)}>
          {country.name}<button onClick={() => showCountry(country)} >show</button>
        </div>
      )
    )
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else {
    return <div></div>
  }
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => 
          <li key={country.languages.indexOf(language)}>{
            language.name}
          </li>)}
      </ul>
      <img src={country.flag} width='100px' alt={country.name}/>
    </div>
  )
}

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
