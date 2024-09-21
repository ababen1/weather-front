import { useContext } from 'react';
import './App.css';
import WeatherPage from './pages/WeatherPage';
import { Box } from '@mui/material';
import { CurrentThemeContext, CurrentThemeProvider } from './context/CurrentThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton/ThemeToggleButton';
import { WeatherDataProvider } from './context/WeatherDataContext';
import { InputProvider } from './context/InputContext';



function App() {
  const { theme } = useContext(CurrentThemeContext);
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
          <WeatherDataProvider>
            <InputProvider>
              <WeatherPage />
            </InputProvider>
          </WeatherDataProvider>
        </div>
      </Box>
    </CurrentThemeProvider>
  );
}

export default App;
