import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  function handleClick() {
    toggleTheme();
  }

  return (
    <div className="theme-toggle">
      <div className="theme-button" onClick={handleClick}>
        <div className="theme-button-text">{theme}</div>
      </div>
    </div>
  );
}

export default ThemeToggle;
