import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherPage from './pages/WeatherPage';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';
import { CurrentThemeContext, CurrentThemeProvider, darkTheme } from './context/CurrentThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton/ThemeToggleButton';
import { WeatherData } from './types/weather-types';
import WeatherDataContext from './context/WeatherDataContext';
import { InputProvider } from './context/InputContext';



function App() {
  const { theme } = useContext(CurrentThemeContext);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])

  return (
    <CurrentThemeProvider>
      <Box sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh', // Ensure it takes the full screen height
        padding: 2
      }}>
        <ThemeToggleButton />
        <div className="App">
          <h1>Weather App</h1>
          <WeatherDataContext.Provider value={{ weatherData: weatherData, setWeatherData: setWeatherData }}>
            <InputProvider>
              <WeatherPage />
            </InputProvider>
          </WeatherDataContext.Provider>
        </div>
      </Box>
    </CurrentThemeProvider>
  );
}

export default App;
