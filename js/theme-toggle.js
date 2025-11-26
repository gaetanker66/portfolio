// Theme toggle functionality
(function() {
  'use strict';

  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const THEME_KEY = 'portfolio-theme';
  const DARK_MODE = 'dark-mode';
  const LIGHT_MODE = 'light-mode';

  // Initialize theme on page load
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    // Default to dark mode if no preference is saved
    if (savedTheme) {
      body.className = savedTheme;
    } else {
      body.className = DARK_MODE;
      localStorage.setItem(THEME_KEY, DARK_MODE);
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = body.className;
    const newTheme = currentTheme === DARK_MODE ? LIGHT_MODE : DARK_MODE;
    
    body.className = newTheme;
    localStorage.setItem(THEME_KEY, newTheme);
  }

  // Event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Initialize on page load
  initTheme();
})();

