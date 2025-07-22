import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = ({ size = 'medium', position = 'relative' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${size} ${position}`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
          <span className="toggle-icon">{isDarkMode ? '🌙' : '☀️'}</span>
        </div>
      </div>
      <span className="toggle-label">{isDarkMode ? 'Dark' : 'Light'}</span>
    </button>
  );
};

export default ThemeToggle;
