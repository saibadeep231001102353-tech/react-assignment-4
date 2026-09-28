import React from 'react';
import { AlertTriangle, RefreshCw, Compass, Key, ArrowRight } from 'lucide-react';
import './ErrorState.css';

/**
 * ErrorState Component
 * Requirement: "Include proper Error Handling"
 * Displays structured error diagnosis, suggested quick recoveries, and retry actions.
 */
const ErrorState = ({
  errorMessage,
  failedCity,
  onRetry,
  onSelectCity,
  onOpenApiKeyModal
}) => {
  const isKeyError = errorMessage?.toLowerCase().includes('api key');

  return (
    <div className="error-container-card card-glass" role="alert" aria-live="assertive">
      <div className="error-icon-box">
        <AlertTriangle size={36} />
      </div>

      <div className="error-text-content">
        <h3 className="error-title">Meteorological Query Error</h3>
        <p className="error-message">{errorMessage || 'An unexpected error occurred while fetching weather data.'}</p>
        
        {failedCity && (
          <div className="failed-query-tag">
            <span>Query target: <code>"{failedCity}"</code></span>
          </div>
        )}
      </div>

      {/* Suggested Remedies */}
      <div className="error-suggestions-box">
        <span className="suggestion-label">Suggested actions:</span>
        <ul className="suggestion-list">
          <li>Check that the city name is spelled correctly (e.g., <em>"Kolkata"</em>, <em>"Tokyo"</em>).</li>
          {isKeyError ? (
            <li>Your OpenWeatherMap API key might be expired or invalid. Switch to demo mode or configure a new key.</li>
          ) : (
            <li>Ensure active internet connectivity to contact OpenWeatherMap endpoints.</li>
          )}
        </ul>
      </div>

      {/* Recovery Buttons */}
      <div className="error-actions-row">
        <button
          type="button"
          className="btn btn-primary retry-btn"
          onClick={onRetry}
          id="error-retry-action-btn"
        >
          <RefreshCw size={16} />
          <span>Retry Search</span>
        </button>

        {isKeyError && (
          <button
            type="button"
            className="btn btn-secondary key-settings-btn"
            onClick={onOpenApiKeyModal}
          >
            <Key size={16} />
            <span>Update API Key</span>
          </button>
        )}

        <div className="quick-fallback-group">
          <span className="fallback-label">Or try a known hub:</span>
          <div className="fallback-buttons">
            <button
              type="button"
              className="fallback-city-btn"
              onClick={() => onSelectCity('Kolkata')}
            >
              Kolkata
            </button>
            <button
              type="button"
              className="fallback-city-btn"
              onClick={() => onSelectCity('London')}
            >
              London
            </button>
            <button
              type="button"
              className="fallback-city-btn"
              onClick={() => onSelectCity('Tokyo')}
            >
              Tokyo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
