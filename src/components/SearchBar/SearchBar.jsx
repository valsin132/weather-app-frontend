import { useState, useEffect, useRef } from 'react';
import { IoIosSearch } from 'react-icons/io';
import Card from '../Card/Card';
import styles from './SearchBar.module.scss';

const SearchBar = ({ city, handleCitySearch, citySuggestions, fetchWeatherData }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <Card className={styles.container} showDivider={false}>
      <div className={styles.searchBar} ref={searchRef}>
        <label className={styles.searchLabel}>
          <IoIosSearch />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Enter a city"
            value={city}
            onChange={(e) => {
              handleCitySearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
        </label>
        {showSuggestions && citySuggestions.length > 0 && (
          <ul className={styles.searchSuggestions}>
            {citySuggestions.map((suggestion) => (
              <li
                className={styles.searchSuggestion}
                key={`${suggestion.name}-${suggestion.lat}`}
                onClick={() => {
                  fetchWeatherData(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion.name}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default SearchBar;
