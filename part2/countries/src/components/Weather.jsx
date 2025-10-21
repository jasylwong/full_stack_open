import { useState, useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo'; // https://open-meteo.com/

const Weather = ({ country }) => {
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);

  useEffect(() => {
    const params = {
      "latitude": country.latlng[0],
      "longitude": country.latlng[1],
      "current": ["temperature_2m", "wind_speed_10m"]
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    fetchWeatherApi(url, params).then(responses => {
      const response = responses[0].current();

      setTemperature(response.variables(0).value().toFixed(2))
      setWindSpeed(response.variables(1).value().toFixed(1))
    });
  }, []);

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {temperature} Celsius</p>
      <p>Wind {windSpeed} m/s</p>
    </div>
  )
}

export default Weather