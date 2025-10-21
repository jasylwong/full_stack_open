import Weather from "./Weather"

const Countries = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    const country = countries[0]
    
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={country.flags.png}></img>
        <Weather country={country}/>
      </div>
    )
  } else {
    return countries.map(c => 
      <div key={c.name.common}>
        {c.name.common}<button onClick={() => showCountry(c)}>Show</button>
      </div>
    )
  }
}

export default Countries