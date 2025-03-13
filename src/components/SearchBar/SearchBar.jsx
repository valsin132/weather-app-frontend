import { IoIosSearch } from 'react-icons/io'
import Card from '../Card/Card'
import styles from './SearchBar.module.scss'

const SearchBar = ({ city, handleCitySearch, citySuggestions, fetchWeatherData }) => {
  return (
    <Card className={styles.container} showDivider={false}>
      <div className={styles.searchBar}>
        <label className={styles.searchLabel}>
          <IoIosSearch />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Enter a city"
            value={city}
            onChange={(e) => handleCitySearch(e.target.value)}
          />
        </label>
        <ul className={styles.searchSuggestions}>
          {citySuggestions.map((suggestion) => (
            <li
              className={styles.searchSuggestion}
              key={`${suggestion.name}-${suggestion.lat}`}
              onClick={() => fetchWeatherData(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default SearchBar
