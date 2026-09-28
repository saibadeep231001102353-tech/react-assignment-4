import React from 'react';
import { 
  CloudSun, 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink,
  Code2,
  Cpu
} from 'lucide-react';
import './Footer.css';

/**
 * Footer Component
 * Displays technical assignment metadata, concepts demonstrated, and student credits.
 * Credits: Saibadeep Mullick, 4th Year BCA Student.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="weather-footer">
      <div className="container footer-container">
        {/* Top Info Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Purpose */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <CloudSun size={24} />
              </div>
              <span className="footer-brand-title">SkyPulse Weather</span>
            </div>
            <p className="footer-description">
              Production-grade meteorological dashboard built for React Practical Assignment 4.
              Demonstrates asynchronous data fetching, OpenWeatherMap schema integration, 
              loading spinner states, and graceful error boundary handling.
            </p>
            <div className="academic-badge">
              <GraduationCap size={15} />
              <span>Bachelor of Computer Applications (BCA) - 4th Year</span>
            </div>
          </div>

          {/* Column 2: Assignment Concepts */}
          <div className="footer-col">
            <h4 className="footer-heading">Assignment 4 Concepts</h4>
            <ul className="footer-list">
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span><code>useEffect()</code> Lifecycle Hook for automatic initial API fetch</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span><code>fetch()</code> with <code>async / await</code> asynchronous pipelines</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span>OpenWeatherMap REST API JSON schema integration</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span>Controlled search form with real-time state updating</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span>Interactive Loading Spinner & Comprehensive Error Handling</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Syllabus Requirements Check */}
          <div className="footer-col">
            <h4 className="footer-heading">Required Metric Fields</h4>
            <div className="fields-tag-grid">
              <span className="field-tag verified">✓ Temperature (°C / °F)</span>
              <span className="field-tag verified">✓ Humidity (%)</span>
              <span className="field-tag verified">✓ Wind Speed (m/s / mph)</span>
              <span className="field-tag verified">✓ Weather Icon</span>
              <span className="field-tag verified">✓ Sunrise & Sunset Time</span>
              <span className="field-tag verified">✓ Search by City</span>
              <span className="field-tag verified">✓ Loading Spinner</span>
              <span className="field-tag verified">✓ Proper Error Handling</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Credits Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {currentYear} SkyPulse Weather. Built with React 19 & OpenWeatherMap API specs.
          </p>

          <div className="developer-badge">
            <span className="badge-label">Developed by:</span>
            <span className="dev-name">Saibadeep Mullick</span>
            <span className="dev-dept">BCA 4th Year</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
