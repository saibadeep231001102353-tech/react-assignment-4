import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import WeatherSearch from './components/WeatherSearch';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import WeatherMetricsGrid from './components/WeatherMetricsGrid';
import ForecastSection from './components/ForecastSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorState from './components/ErrorState';
import ApiKeyModal from './components/ApiKeyModal';
import Footer from './components/Footer';
import { fetchWeatherByCity } from './services/weatherService';
import './App.css';

/**
 * App Root Coordinator
 * React Practical Assignment 4: Weather Dashboard using OpenWeatherMap API
 * 
 * Demonstrates:
 * - useEffect() for lifecycle & automatic data fetching
 * - async / await with fetch()
 * - Loading Spinner states
 * - Error Handling with retry logic
 * - State management for unit conversion, theme, and API key
 */
function App() {
  // Active city query (default: Kolkata)
  const [city, setCity] = useState('Kolkata');

  // Meteorological state payload
  const [weatherData, setWeatherData] = useState(null);

  // Asynchronous status states
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [failedCity, setFailedCity] = useState(null);

  // Measurement unit ('metric' for °C, 'imperial' for °F)
  const [unit, setUnit] = useState('metric');

  // Theme preference ('dark' | 'light')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('skypulse_theme_pref') || 'dark';
  });

  // User-configured OpenWeatherMap API key (optional)
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('owm_custom_api_key') || '';
  });

  // Modal visibility
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Recent city searches array
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = localStorage.getItem('skypulse_recent_searches');
      return stored ? JSON.parse(stored) : ['Kolkata', 'London', 'Tokyo'];
    } catch {
      return ['Kolkata', 'London', 'Tokyo'];
    }
  });

  // Synchronize visual theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('skypulse_theme_pref', theme);
  }, [theme]);

  // Core Asynchronous Fetch Function (Async / Await / Fetch API)
  const loadWeatherData = useCallback(async (targetCity, currentUnit, currentApiKey) => {
    if (!targetCity || !targetCity.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setFailedCity(null);

    try {
      const data = await fetchWeatherByCity(targetCity, currentApiKey, currentUnit);
      setWeatherData(data);

      // Save successful city to recent searches
      setRecentSearches((prev) => {
        const filtered = prev.filter((c) => c.toLowerCase() !== targetCity.toLowerCase());
        const updated = [data.name || targetCity, ...filtered].slice(0, 6);
        localStorage.setItem('skypulse_recent_searches', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error('Weather retrieval error:', err);
      setErrorMessage(err.message || 'Failed to retrieve meteorological data.');
      setFailedCity(targetCity);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Primary useEffect: Lifecycle API integration
  useEffect(() => {
    loadWeatherData(city, unit, apiKey);
  }, [city, unit, apiKey, loadWeatherData]);

  // Handlers
  const handleSearchCity = (newCity) => {
    if (newCity && newCity.trim()) {
      setCity(newCity.trim());
    }
  };

  const handleToggleUnit = (newUnit) => {
    if (newUnit !== unit) {
      setUnit(newUnit);
    }
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('owm_custom_api_key', newKey);
  };

  const handleRetry = () => {
    loadWeatherData(failedCity || city, unit, apiKey);
  };

  // Determine atmospheric glow depending on condition
  const weatherMain = weatherData?.weather?.[0]?.main?.toLowerCase() || '';
  let glowClass = 'glow-clear';
  if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
    glowClass = 'glow-rain';
  } else if (weatherMain.includes('cloud')) {
    glowClass = 'glow-clouds';
  } else if (weatherMain.includes('thunder')) {
    glowClass = 'glow-thunder';
  }

  return (
    <div className={`app-canvas ${glowClass}`}>
      {/* Ambient Atmospheric Lighting */}
      <div className="ambient-sphere sphere-top-left"></div>
      <div className="ambient-sphere sphere-top-right"></div>

      {/* Header Navigation */}
      <Header
        unit={unit}
        onToggleUnit={handleToggleUnit}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        isCustomKeyActive={Boolean(apiKey && apiKey.length > 10)}
      />

      {/* Search Input Section */}
      <WeatherSearch
        currentCity={city}
        onSearch={handleSearchCity}
        recentSearches={recentSearches}
        isLoading={isLoading}
      />

      {/* Main Meteorological Content Area */}
      <main className="main-content">
        {/* State 1: Loading Spinner */}
        {isLoading && (
          <LoadingSpinner cityName={city} />
        )}

        {/* State 2: Error Condition */}
        {!isLoading && errorMessage && (
          <ErrorState
            errorMessage={errorMessage}
            failedCity={failedCity}
            onRetry={handleRetry}
            onSelectCity={handleSearchCity}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          />
        )}

        {/* State 3: Successful Meteorological Data Presentation */}
        {!isLoading && !errorMessage && weatherData && (
          <>
            {/* 1. Primary Current Weather Hero Card */}
            <CurrentWeatherCard
              weatherData={weatherData}
              unit={unit}
            />

            {/* 2. Required Atmospheric Parameters Grid */}
            <WeatherMetricsGrid
              weatherData={weatherData}
              unit={unit}
            />

            {/* 3. 24-Hour & 5-Day Extended Outlook */}
            <ForecastSection
              forecastList={weatherData.forecast || []}
              hourlyList={weatherData.hourly || []}
              unit={unit}
            />
          </>
        )}
      </main>

      {/* Footer with Student Attribution & Concepts */}
      <Footer />

      {/* API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        currentKey={apiKey}
        onSaveKey={handleSaveApiKey}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </div>
  );
}

export default App;
