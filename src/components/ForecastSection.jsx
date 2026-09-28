import React from 'react';
import { 
  CalendarDays, 
  Clock, 
  Droplets, 
  Wind, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { getOwmIconUrl } from '../services/weatherService';
import './ForecastSection.css';

/**
 * ForecastSection Component
 * Displays:
 * 1. 24-Hour Hourly Forecast trend
 * 2. 5-Day Extended Weather Outlook with daily high/lows
 */
const ForecastSection = ({ forecastList = [], hourlyList = [], unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <section className="forecast-section">
      <div className="container">
        {/* 24-Hour Hourly Forecast */}
        {hourlyList && hourlyList.length > 0 && (
          <div className="hourly-forecast-wrapper card-glass">
            <div className="forecast-header-row">
              <div className="forecast-title-group">
                <Clock size={18} className="title-icon" />
                <h3 className="forecast-heading">24-Hour Hourly Forecast</h3>
              </div>
              <span className="forecast-badge">3-Hour Intervals</span>
            </div>

            <div className="hourly-track">
              {hourlyList.map((hour, idx) => (
                <div key={idx} className="hourly-node">
                  <span className="hourly-time">{hour.time}</span>
                  <img
                    src={getOwmIconUrl(hour.icon)}
                    alt="Hourly weather icon"
                    className="hourly-icon"
                  />
                  <span className="hourly-temp">{hour.temp}{tempUnit}</span>
                  {hour.pop > 0 && (
                    <span className="hourly-pop" title="Precipitation probability">
                      <Droplets size={10} />
                      <span>{hour.pop}%</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5-Day Extended Forecast */}
        <div className="daily-forecast-wrapper card-glass">
          <div className="forecast-header-row">
            <div className="forecast-title-group">
              <CalendarDays size={18} className="title-icon" />
              <h3 className="forecast-heading">5-Day Meteorological Outlook</h3>
            </div>
            <span className="forecast-badge">Daily Synopsis</span>
          </div>

          <div className="daily-cards-grid">
            {forecastList.map((day, idx) => {
              const cond = day.weather[0] || {};
              const iconUrl = getOwmIconUrl(cond.icon);

              return (
                <div key={day.dt || idx} className="daily-card card-glass-subtle">
                  <div className="daily-day-meta">
                    <span className="daily-day-name">{day.dayName}</span>
                    <span className="daily-date">{day.dateFormatted}</span>
                  </div>

                  <div className="daily-icon-box">
                    <img
                      src={iconUrl}
                      alt={cond.description || 'Day weather icon'}
                      className="daily-weather-icon"
                    />
                    <span className="daily-cond-desc">{cond.main}</span>
                  </div>

                  <div className="daily-temp-range">
                    <span className="daily-high" title="Expected High">
                      <ArrowUp size={12} />
                      <span>{Math.round(day.main.temp_max)}{tempUnit}</span>
                    </span>
                    <span className="daily-low" title="Expected Low">
                      <ArrowDown size={12} />
                      <span>{Math.round(day.main.temp_min)}{tempUnit}</span>
                    </span>
                  </div>

                  <div className="daily-meta-chips">
                    <span className="daily-chip">
                      <Droplets size={12} />
                      <span>{day.main.humidity}%</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForecastSection;
