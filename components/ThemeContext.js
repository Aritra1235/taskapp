import React, { createContext, useState } from 'react';
import { StyleSheet } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const lightTheme = {
  container: {
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#000000'
  },
  navigation: {
    backgroundColor: '#ffffff',
    headerTintColor: '#000000',
    headerTitleColor: '#000000',
  },
};

const darkTheme = {
  container: {
    backgroundColor: '#000000',
  },
  text: {
    color: '#ffffff'
  },
  navigation: {
    backgroundColor: '#000000',
    headerTintColor: '#ffffff',
    headerTitleColor: '#ffffff',
  },
};
