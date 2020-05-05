import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
require('dotenv').config();

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

const Weather = ({ country }) => {
  const [weather, setWeather] = useState('')
  const [hasData, setHasData] = useState(false);

  const hook = () => {
    axios.get("http://api.weatherstack.com/current?access_key="+process.env.REACT_APP_WEATHERSTACK_KEY+"&query="+country.capital)
      .then(resolve => {
        setWeather(resolve.data)
        setHasData(true);
      })
  }
  useEffect(hook, [])

  return (
    hasData ? (
      <>
      <div>temperature: {weather.current.temperature} celsius</div>
      <img src={weather.current.weather_icons[0]} />
      <div>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
      </>
    ) : null
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
