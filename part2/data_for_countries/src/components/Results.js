import React from 'react';
import Country from './Country';

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

export default Results;