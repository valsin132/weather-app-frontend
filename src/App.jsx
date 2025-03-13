import { useState, useEffect } from 'react'
import axios from 'axios'
import cities from 'cities.json'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import WeatherForecast from './components/WeatherForecast/WeatherForecast'
import WindSpeed from './components/WindSpeed/WindSpeed'
import AdditionalConditions from './components/AdditionalConditions/AdditionalConditions'
import styles from './App.module.scss'

const openWeatherMapApiKey = import.meta.env.VITE_OPENWEATHERMAP_API

const App = () => {
  const [city, setCity] = useState('')
  const [citySuggestions, setCitySuggestions] = useState([])
  const [weatherData, setWeatherData] = useState(null)
  const [weatherDataHourly, setWeatherDataHourly] = useState(null)

  useEffect(() => {
    fetchWeatherData({ name: 'Vilnius' })
  }, [])

  const handleCitySearch = (inputCity) => {
    setCity(inputCity)
    const matchingCities = cities
      .filter((c) => c.name.toLowerCase().includes(inputCity.toLowerCase()))
      .slice(0, 4)
    setCitySuggestions(matchingCities)
  }

  const fetchWeatherData = (selectedCity) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.name}&appid=${openWeatherMapApiKey}&units=metric`,
      )
      .then((response) => setWeatherData(response.data))
      .catch((error) => console.error('Error fetching weather data:', error))

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity.name}&appid=${openWeatherMapApiKey}&units=metric`,
      )
      .then((response) => setWeatherDataHourly(response.data))
      .catch((error) => console.error('Error fetching weather data:', error))

    setCitySuggestions([])
    console.log(weatherData)
    console.log(weatherDataHourly)
  }

  return (
    <div className={styles.weatherApp}>
      <SearchBar
        city={city}
        handleCitySearch={handleCitySearch}
        citySuggestions={citySuggestions}
        fetchWeatherData={fetchWeatherData}
      />
      {weatherData && <WeatherInfo weatherData={weatherData} />}
      <div className={styles.infoWrapper}>
        <WeatherForecast weatherDataHourly={weatherDataHourly} />
        <div className={styles.weatherGrid}>
          <WindSpeed windSpeed={weatherData?.wind?.speed} />
          {weatherData && <AdditionalConditions weatherData={weatherData} />}
        </div>
      </div>
    </div>
  )
}

export default App
