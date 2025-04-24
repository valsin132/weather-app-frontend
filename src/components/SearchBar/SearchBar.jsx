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
            tabIndex="0"
          />
        </label>
        {showSuggestions && citySuggestions.length > 0 && (
          <ul className={styles.searchSuggestions} role="listbox" aria-live="polite">
            {citySuggestions.map((suggestion) => (
              <li key={`${suggestion.name}-${suggestion.lat}`}>
                <button
                  className={styles.searchSuggestion}
                  onClick={() => {
                    fetchWeatherData(suggestion);
                    setShowSuggestions(false);
                  }}
                  role="option"
                  tabIndex="0"
                  aria-label={`Select ${suggestion.name}, ${suggestion.country}`}
                >
                  {suggestion.name}, {suggestion.country}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default SearchBar;
