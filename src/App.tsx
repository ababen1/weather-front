import { useContext } from 'react';
import './App.css';
import WeatherPage from './pages/WeatherPage';
import { Box, Container, Grid2, Typography } from '@mui/material';
import { CurrentThemeContext, CurrentThemeProvider } from './context/CurrentThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton/ThemeToggleButton';
import { WeatherDataProvider } from './context/WeatherDataContext';
import { InputProvider } from './context/InputContext';



function App() {
  const { theme } = useContext(CurrentThemeContext);
  return (
    <CurrentThemeProvider>
      <Grid2 sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        padding: 2,
        minHeight: '100vh',
        minWidth: '100%'
        
      }}>
        <ThemeToggleButton />
        <div className="App">
          <Typography variant='h4' >The Weather App</Typography>
          <WeatherDataProvider>
            <InputProvider>
              <WeatherPage />
            </InputProvider>
          </WeatherDataProvider>
        </div>
      </Grid2>
    </CurrentThemeProvider>
  );
}

export default App;
