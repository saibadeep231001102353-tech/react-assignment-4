import React from 'react';
import { 
  Droplets, 
  Wind, 
  Sunrise, 
  Sunset, 
  Gauge, 
  Eye, 
  CloudRain, 
  Compass,
  SunMedium,
  CheckCircle2
} from 'lucide-react';
import { formatTime, calculateDaylight } from '../services/weatherService';
import './WeatherMetricsGrid.css';

/**
 * WeatherMetricsGrid Component
 * Highlights the required Assignment 4 fields:
 * - Humidity
 * - Wind Speed & Direction
 * - Sunrise & Sunset time with daylight arc
 * Plus Atmospheric Pressure, Visibility, and Cloudiness.
 */
const WeatherMetricsGrid = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const {
    main = {},
    wind = {},
    sys = {},
    visibility = 10000,
    clouds = {},
    timezone = 0
  } = weatherData;

  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const visibilityKm = (visibility / 1000).toFixed(1);

  // Formatted Sunrise & Sunset times in city's local timezone
  const sunriseTime = formatTime(sys.sunrise, timezone);
  const sunsetTime = formatTime(sys.sunset, timezone);
  const daylightDuration = calculateDaylight(sys.sunrise, sys.sunset);

  // Humidity status message
  const getHumidityStatus = (h) => {
    if (h < 30) return 'Dry environment';
    if (h <= 60) return 'Optimal comfort';
    if (h <= 80) return 'Moderately humid';
    return 'High humidity';
  };

  // Wind direction in Cardinal format
  const getWindCardinal = (deg) => {
    if (deg === undefined) return 'N/A';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <section className="metrics-section">
      <div className="container">
        <div className="section-title-bar">
          <h2 className="metrics-title">
            Atmospheric <span className="gradient-text">Parameters</span>
          </h2>
          <span className="spec-indicator">
            <CheckCircle2 size={13} />
            <span>OpenWeatherMap Metrics</span>
          </span>
        </div>

        <div className="metrics-grid">
          {/* Card 1: Humidity (REQUIRED FIELD) */}
          <div className="metric-card card-glass" id="metric-humidity">
            <div className="metric-header">
              <div className="metric-icon-box icon-cyan">
                <Droplets size={22} />
              </div>
              <span className="metric-tag">Hydration</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Relative Humidity</span>
              <div className="metric-value-row">
                <span className="metric-number">{main.humidity ?? 0}</span>
                <span className="metric-unit">%</span>
              </div>
              {/* Humidity Progress Bar */}
              <div className="metric-progress-bar">
                <div 
                  className="metric-progress-fill fill-cyan"
                  style={{ width: `${Math.min(100, main.humidity || 0)}%` }}
                ></div>
              </div>
              <span className="metric-subtext">{getHumidityStatus(main.humidity ?? 0)}</span>
            </div>
          </div>

          {/* Card 2: Wind Speed & Direction (REQUIRED FIELD) */}
          <div className="metric-card card-glass" id="metric-wind-speed">
            <div className="metric-header">
              <div className="metric-icon-box icon-emerald">
                <Wind size={22} />
              </div>
              <span className="metric-tag">Circulation</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Wind Speed & Gusts</span>
              <div className="metric-value-row">
                <span className="metric-number">{wind.speed ?? 0}</span>
                <span className="metric-unit">{windUnit}</span>
              </div>
              <div className="wind-direction-pill">
                <Compass size={14} style={{ transform: `rotate(${wind.deg || 0}deg)` }} />
                <span>Direction: {wind.deg ?? 0}° ({getWindCardinal(wind.deg)})</span>
              </div>
              <span className="metric-subtext">Steady surface breeze</span>
            </div>
          </div>

          {/* Card 3: Sunrise & Sunset (REQUIRED FIELD) */}
          <div className="metric-card card-glass sunrise-sunset-card" id="metric-solar-cycle">
            <div className="metric-header">
              <div className="metric-icon-box icon-amber">
                <SunMedium size={22} />
              </div>
              <span className="metric-tag">Solar Cycle</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Sunrise & Sunset Schedule</span>

              <div className="solar-times-row">
                {/* Sunrise */}
                <div className="solar-node">
                  <div className="solar-mini-icon sunrise-icon">
                    <Sunrise size={18} />
                  </div>
                  <div className="solar-time-info">
                    <span className="solar-node-label">Sunrise</span>
                    <strong className="solar-node-time" id="sunrise-time-value">{sunriseTime}</strong>
                  </div>
                </div>

                <div className="solar-divider"></div>

                {/* Sunset */}
                <div className="solar-node">
                  <div className="solar-mini-icon sunset-icon">
                    <Sunset size={18} />
                  </div>
                  <div className="solar-time-info">
                    <span className="solar-node-label">Sunset</span>
                    <strong className="solar-node-time" id="sunset-time-value">{sunsetTime}</strong>
                  </div>
                </div>
              </div>

              {/* Daylight summary */}
              <div className="daylight-summary-pill">
                <span>Total Daylight: <strong>{daylightDuration}</strong></span>
              </div>
            </div>
          </div>

          {/* Card 4: Atmospheric Pressure */}
          <div className="metric-card card-glass">
            <div className="metric-header">
              <div className="metric-icon-box icon-indigo">
                <Gauge size={22} />
              </div>
              <span className="metric-tag">Barometric</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Atmospheric Pressure</span>
              <div className="metric-value-row">
                <span className="metric-number">{main.pressure ?? 1013}</span>
                <span className="metric-unit">hPa</span>
              </div>
              <span className="metric-subtext">
                {main.pressure > 1015 ? 'High pressure (Fair weather)' : 'Standard atmospheric condition'}
              </span>
            </div>
          </div>

          {/* Card 5: Visibility Range */}
          <div className="metric-card card-glass">
            <div className="metric-header">
              <div className="metric-icon-box icon-purple">
                <Eye size={22} />
              </div>
              <span className="metric-tag">Optics</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Surface Visibility</span>
              <div className="metric-value-row">
                <span className="metric-number">{visibilityKm}</span>
                <span className="metric-unit">km</span>
              </div>
              <span className="metric-subtext">
                {visibility >= 10000 ? 'Clear horizon & full visibility' : 'Moderate haze or obstruction'}
              </span>
            </div>
          </div>

          {/* Card 6: Cloud Cover */}
          <div className="metric-card card-glass">
            <div className="metric-header">
              <div className="metric-icon-box icon-sky">
                <CloudRain size={22} />
              </div>
              <span className="metric-tag">Sky Shield</span>
            </div>
            <div className="metric-body">
              <span className="metric-label">Cloud Coverage</span>
              <div className="metric-value-row">
                <span className="metric-number">{clouds.all ?? 20}</span>
                <span className="metric-unit">%</span>
              </div>
              <div className="metric-progress-bar">
                <div 
                  className="metric-progress-fill fill-sky"
                  style={{ width: `${Math.min(100, clouds.all || 20)}%` }}
                ></div>
              </div>
              <span className="metric-subtext">Cumulative cloud ceiling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherMetricsGrid;
