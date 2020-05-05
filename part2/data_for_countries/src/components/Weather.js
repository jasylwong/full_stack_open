import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

export default Weather;