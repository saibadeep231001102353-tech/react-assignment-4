import React from 'react';
import { 
  MapPin, 
  Clock, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  Sparkles, 
  CloudSun,
  ShieldCheck
} from 'lucide-react';
import { getOwmIconUrl, formatTime } from '../services/weatherService';
import './CurrentWeatherCard.css';

/**
 * CurrentWeatherCard Component
 * Displays the primary weather hero banner:
 * - City, Country, Date, Local Time
 * - Large Temperature display (°C / °F)
 * - Weather Icon
 * - Weather condition description
 * - Feels like & Min/Max temperature
 */
const CurrentWeatherCard = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const {
    name,
    sys = {},
    main = {},
    weather = [{}],
    dt,
    timezone = 0,
    isMock
  } = weatherData;

  const currentWeather = weather[0] || {};
  const tempUnitSymbol = unit === 'metric' ? '°C' : '°F';
  const iconUrl = getOwmIconUrl(currentWeather.icon);

  // Format current local time of the selected city
  const localTimeStr = formatTime(dt, timezone);

  // Format today's date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <section className="current-weather-section">
      <div className="container">
        <div className="current-weather-hero card-glass">
          {/* Top Status Bar */}
          <div className="hero-top-bar">
            <div className="location-group">
              <div className="location-icon-circle">
                <MapPin size={20} />
              </div>
              <div className="location-text">
                <h1 className="city-title">
                  {name}
                  {sys.country && <span className="country-tag">{sys.country}</span>}
                </h1>
                <div className="date-time-row">
                  <span className="meta-time">
                    <Clock size={13} />
                    <span>Local Time: {localTimeStr}</span>
                  </span>
                  <span className="dot-divider">•</span>
                  <span className="meta-date">
                    <Calendar size={13} />
                    <span>{todayFormatted}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Provider Source Tag */}
            <div className="provider-tag">
              <Sparkles size={13} className="sparkle" />
              <span>{isMock ? 'Meteorological Simulation' : 'Live OpenWeatherMap API'}</span>
            </div>
          </div>

          {/* Main Hero Body: Temperature & Weather Icon */}
          <div className="hero-main-body">
            <div className="temp-display-group">
              <div className="temp-reading">
                <span className="temp-number" id="current-temperature-display">
                  {Math.round(main.temp ?? 0)}
                </span>
                <span className="temp-unit">{tempUnitSymbol}</span>
              </div>
              <div className="temp-range-meta">
                <span className="feels-like-text">
                  Feels like <strong>{Math.round(main.feels_like ?? main.temp ?? 0)}{tempUnitSymbol}</strong>
                </span>
                <div className="min-max-pills">
                  <span className="temp-pill pill-max" title="Daily High">
                    <ArrowUp size={13} />
                    <span>High: {Math.round(main.temp_max ?? main.temp ?? 0)}{tempUnitSymbol}</span>
                  </span>
                  <span className="temp-pill pill-min" title="Daily Low">
                    <ArrowDown size={13} />
                    <span>Low: {Math.round(main.temp_min ?? main.temp ?? 0)}{tempUnitSymbol}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Weather Visual & Description */}
            <div className="weather-visual-group">
              <div className="icon-glow-container">
                <img
                  src={iconUrl}
                  alt={currentWeather.description || 'Weather condition icon'}
                  className="weather-hero-icon"
                  id="current-weather-icon"
                />
              </div>
              <div className="condition-text-box">
                <span className="condition-main">{currentWeather.main || 'Clear'}</span>
                <span className="condition-desc">
                  {currentWeather.description 
                    ? currentWeather.description.charAt(0).toUpperCase() + currentWeather.description.slice(1)
                    : 'Clear Sky'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeatherCard;
