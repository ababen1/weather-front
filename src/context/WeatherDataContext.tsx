import { createContext, ReactNode, useState } from 'react';
import { WeatherData } from '../types/weather-types';

interface IWeatherDataContext {
    weatherData: WeatherData[],
    setWeatherData: (val: WeatherData[]) => void
}

export const WeatherDataContext = createContext<IWeatherDataContext>({
    weatherData: [],
    setWeatherData: () => {}
});

export default WeatherDataContext