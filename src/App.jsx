import { useState, useEffect } from 'react'
import cities from 'cities.json'
import TopCities from './components/TopCities/TopCities'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import WeatherForecast from './components/WeatherForecast/WeatherForecast'
import WindSpeed from './components/WindSpeed/WindSpeed'
import AdditionalConditions from './components/AdditionalConditions/AdditionalConditions'
import { fetchWeatherData, saveSearch, fetchTopCities } from './api/searchApi'
import { CiCloudSun } from 'react-icons/ci'
import styles from './App.module.scss'

const App = () => {
  const [city, setCity] = useState('')
  const [citySuggestions, setCitySuggestions] = useState([])
  const [weatherData, setWeatherData] = useState(null)
  const [weatherDataHourly, setWeatherDataHourly] = useState(null)
  const [topCities, setTopCities] = useState([])

  useEffect(() => {
    handleInitialData()

    fetchTopCities()
      .then((data) => {
        setTopCities(data)
        localStorage.setItem('topCities', JSON.stringify(data))
      })
      .catch((error) => console.log('Error fetching top cities', error))
  }, [])

  const handleInitialData = async () => {
    try {
      const { weatherData, weatherDataHourly } = await fetchWeatherData('Vilnius')
      setWeatherData(weatherData)
      setWeatherDataHourly(weatherDataHourly)
    } catch (error) {
      console.error('Error fetching initial weather data:', error)
    }
  }

  const handleCitySearch = (inputCity) => {
    setCity(inputCity)
    const matchingCities = cities
      .filter((c) => c.name.toLowerCase().includes(inputCity.toLowerCase()))
      .slice(0, 4)
    setCitySuggestions(matchingCities)
  }

  const handleFetchWeatherData = async (selectedCity) => {
    try {
      const { weatherData, weatherDataHourly } = await fetchWeatherData(selectedCity.name)
      setWeatherData(weatherData)
      setWeatherDataHourly(weatherDataHourly)
      // save the search to the backend
      await saveSearch(selectedCity.name)
      console.log('Search saved successfully')

      // refresh top cities after a new search
      const updatedTopCities = await fetchTopCities()
      setTopCities(updatedTopCities)
      localStorage.setItem('topCities', JSON.stringify(updatedTopCities))
    } catch (error) {
      console.error('Error fetching weather data or saving search:', error)
    }

    setCitySuggestions([])
  }

  return (
    <div className={styles.weatherApp}>
      <header className={styles.header}>
        <CiCloudSun className={styles.headerIcon} />
        <h1>Weather App</h1>
      </header>
      <div className={styles.searchTopWrapper}>
        <SearchBar
          city={city}
          handleCitySearch={handleCitySearch}
          citySuggestions={citySuggestions}
          fetchWeatherData={handleFetchWeatherData}
        />
        <TopCities topCities={topCities} />
      </div>

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
