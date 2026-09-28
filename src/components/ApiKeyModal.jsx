import React, { useState } from 'react';
import { X, Key, Check, Info, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import './ApiKeyModal.css';

/**
 * ApiKeyModal Component
 * Allows user to optionally provide their personal OpenWeatherMap API key.
 * If empty, the app seamlessly runs in high-fidelity Meteorological Simulation mode.
 */
const ApiKeyModal = ({
  isOpen,
  currentKey,
  onSaveKey,
  onClose
}) => {
  const [inputKey, setInputKey] = useState(currentKey || '');
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(inputKey.trim());
    setStatusMessage('Key preference updated successfully!');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveKey('');
    setStatusMessage('Switched back to Built-in Meteorological Provider.');
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container card-glass" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-icon-box">
            <Key size={22} />
          </div>
          <div className="modal-title-group">
            <h3 className="modal-title">OpenWeatherMap API Key Settings</h3>
            <p className="modal-subtitle">Connect live meteorological satellites or use Demo Provider</p>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="modal-form">
          <div className="form-group">
            <label htmlFor="owm-api-key-input" className="form-label">
              <span>OpenWeatherMap API 2.5 Key (Optional)</span>
            </label>
            <input
              type="text"
              id="owm-api-key-input"
              className="form-input"
              placeholder="e.g. 4a8b1c2d3e4f5a6b7c8d9e0f..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              autoComplete="off"
            />
            <span className="form-hint">
              Leave blank to automatically utilize the high-fidelity offline meteorological simulation.
            </span>
          </div>

          {/* Info callout */}
          <div className="modal-info-box">
            <Info size={16} className="info-icon" />
            <div className="info-text">
              <p>
                A key is <strong>not required</strong> to test all Assignment 4 features (Temperature, Humidity, Wind Speed, Weather Icon, Sunrise & Sunset, Search, Loading, Errors). 
              </p>
            </div>
          </div>

          {statusMessage && (
            <div className="status-notice">
              <Check size={14} />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Actions */}
          <div className="modal-actions-bar">
            {inputKey && (
              <button
                type="button"
                className="btn btn-secondary clear-btn"
                onClick={handleClear}
              >
                Clear Key (Use Demo)
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
