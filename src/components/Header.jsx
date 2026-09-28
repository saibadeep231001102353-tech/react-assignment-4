import React from 'react';
import { 
  CloudSun, 
  Sun, 
  Moon, 
  Key, 
  Sparkles, 
  Thermometer, 
  Layers 
} from 'lucide-react';
import './Header.css';

/**
 * Header Component
 * Provides top branding, unit toggle (°C/°F), theme toggle, and API Key settings modal trigger.
 */
const Header = ({
  unit,
  onToggleUnit,
  theme,
  onToggleTheme,
  onOpenApiKeyModal,
  isCustomKeyActive
}) => {
  return (
    <header className="weather-header">
      <div className="container header-container">
        {/* Brand identity */}
        <div className="brand-group">
          <div className="brand-logo-box">
            <CloudSun size={28} className="brand-logo-icon" />
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <span className="brand-name">SkyPulse</span>
              <span className="brand-badge">LIVE METEO</span>
            </div>
            <span className="brand-tagline">OpenWeatherMap Real-time Meteorological Dashboard</span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="header-actions">
          {/* Assignment Tag */}
          <div className="assignment-chip">
            <span className="pulse-indicator"></span>
            <span>Assignment 4: API & useEffect</span>
          </div>

          {/* Unit Toggle (°C / °F) */}
          <div className="unit-toggle-group" title="Toggle Temperature Unit">
            <button
              type="button"
              className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
              onClick={() => onToggleUnit('metric')}
              aria-label="Celsius unit"
            >
              °C
            </button>
            <button
              type="button"
              className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
              onClick={() => onToggleUnit('imperial')}
              aria-label="Fahrenheit unit"
            >
              °F
            </button>
          </div>

          {/* API Key Modal Button */}
          <button
            type="button"
            className={`api-key-btn ${isCustomKeyActive ? 'has-custom-key' : ''}`}
            onClick={onOpenApiKeyModal}
            title={isCustomKeyActive ? 'Using custom OpenWeatherMap API Key' : 'Configure OpenWeatherMap API Key'}
          >
            <Key size={16} />
            <span className="api-key-text">{isCustomKeyActive ? 'Key Active' : 'API Key'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
