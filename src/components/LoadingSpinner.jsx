import React, { useState, useEffect } from 'react';
import { Loader2, Radio, CloudSun, Sparkles } from 'lucide-react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * Requirement: "Loading Spinner"
 * Modern radar & atmospheric meteorological spinner with rotating status messages.
 */
const LoadingSpinner = ({ cityName = 'selected city' }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
    `Connecting to meteorological stations for ${cityName}...`,
    'Acquiring real-time barometric & humidity indices...',
    'Computing solar sunrise and sunset schedules...',
    'Synthesizing 5-day atmospheric forecast...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1200);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="spinner-container-card card-glass" role="status" aria-live="polite">
      {/* Outer Radar Rings */}
      <div className="radar-orbit-box">
        <div className="radar-ring-outer"></div>
        <div className="radar-ring-mid"></div>
        <div className="radar-scanner"></div>
        
        {/* Core Pulsing Icon */}
        <div className="spinner-core-icon">
          <CloudSun size={32} className="pulsing-cloud" />
        </div>
      </div>

      <div className="spinner-text-group">
        <div className="spinner-title-row">
          <Radio size={16} className="radar-live-icon" />
          <h3 className="spinner-title">Fetching Atmospheric Data</h3>
        </div>
        <p className="spinner-status-msg">{messages[msgIndex]}</p>
      </div>

      <div className="spinner-progress-track">
        <div className="spinner-indeterminate-bar"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
