import React from 'react';
import Weather from './Weather';

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
      <h3>Weather in {country.capital}</h3>
      <Weather country={country} />
    </div>
  )
}

export default Country;