import { createContext, ReactNode, useState } from 'react';
import { WeatherData } from '../types/weather-types';

interface IWeatherDataContext {
    weatherData: WeatherData[],
    setWeatherData: (val: WeatherData[]) => void
}

export const WeatherDataContext = createContext<IWeatherDataContext>({
    weatherData: [],
    setWeatherData: () => { }
});

export const WeatherDataProvider = ({ children }: { children: ReactNode }) => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([])

    return (
        <WeatherDataContext.Provider value={{ weatherData: weatherData, setWeatherData: setWeatherData }}>
            {children}
        </WeatherDataContext.Provider>
    )
}

export default WeatherDataContext