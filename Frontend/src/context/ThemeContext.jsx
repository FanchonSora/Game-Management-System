import React, { createContext, useContext, useState } from 'react';

// Define the default theme properties
const defaultTheme = {
  light: {
    background: '#f0f2f5',
    text: '#1e1e2e'
  },
  dark: {
    background: '#1e1e2e',
    text: '#c7d5e0'
  }
};

// Create the context with a default value
const ThemeContext = createContext({
  theme: defaultTheme.light, // Default to light theme
  toggleTheme: () => {}
});

// Provider component that wraps your app and makes the theme object accessible to any child component that calls useTheme()
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme.light);

  const toggleTheme = () => {
    setTheme(theme === defaultTheme.light ? defaultTheme.dark : defaultTheme.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
