import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  X, 
  History, 
  Navigation, 
  Compass,
  ArrowRight
} from 'lucide-react';
import './WeatherSearch.css';

/**
 * WeatherSearch Component
 * Handles city search form, quick city shortcuts, and geolocate events.
 */
const WeatherSearch = ({
  currentCity,
  onSearch,
  recentSearches = [],
  isLoading
}) => {
  const [searchInput, setSearchInput] = useState('');

  // Popular quick city presets
  const popularCities = ['Kolkata', 'Delhi', 'Mumbai', 'London', 'New York', 'Tokyo', 'Paris'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleQuickCityClick = (city) => {
    onSearch(city);
  };

  return (
    <section className="search-section">
      <div className="container">
        <div className="search-card card-glass">
          {/* Main Search Bar Form */}
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                id="city-search-input"
                className="search-input"
                placeholder="Search by city name (e.g. Kolkata, London, Tokyo, New York)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
              />
              {searchInput && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchInput('')}
                  aria-label="Clear search input"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary search-submit-btn"
              disabled={isLoading || !searchInput.trim()}
              id="search-submit-btn"
            >
              <Search size={16} />
              <span>Search City</span>
            </button>
          </form>

          {/* Quick Preset City Badges */}
          <div className="quick-cities-row">
            <div className="quick-label">
              <Compass size={14} className="quick-icon" />
              <span>Popular Cities:</span>
            </div>
            <div className="quick-pills-list">
              {popularCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`city-pill ${currentCity.toLowerCase() === city.toLowerCase() ? 'active' : ''}`}
                  onClick={() => handleQuickCityClick(city)}
                  disabled={isLoading}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches (if any) */}
          {recentSearches.length > 0 && (
            <div className="recent-searches-row">
              <div className="quick-label">
                <History size={13} className="quick-icon" />
                <span>Recent:</span>
              </div>
              <div className="recent-pills-list">
                {recentSearches.slice(0, 5).map((recentCity) => (
                  <button
                    key={recentCity}
                    type="button"
                    className="recent-pill"
                    onClick={() => handleQuickCityClick(recentCity)}
                    disabled={isLoading}
                  >
                    <span>{recentCity}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WeatherSearch;
