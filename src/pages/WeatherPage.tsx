import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import CordsInput from '../components/CordsInput/CordsInput';
import CityInput from '../components/CityInput/CityInput';
import { Coordinates, WeatherData } from '../types/weather-types';
import { fetchWeather } from '../util/WeatherService';

type InputMethod = "cords" | "city" | "location";

interface Props {

}

const WeatherPage: React.FC<Props> = ({ }) => {
    // Add your component logic here, like state, effects, etc.

    const [inputMethod, setInputMethod] = useState<InputMethod>("cords")
    const [city, setCity] = useState<string>("")
    const [cords, setCords] = useState<Coordinates>({ "latitude": 0, "longitude": 0 })
    const [weatherData, setWeatherData] = useState<WeatherData[]>([])
    const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false)

    const loadWeather = async () => {
        setIsLoadingWeather(true)
        const result = await fetchWeather({ city: city, coordinates: cords })
        setIsLoadingWeather(false)
        setWeatherData(result)
    }

    const locateUser = () => {
        navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
            setCords({ "latitude": pos.coords.latitude, "longitude": pos.coords.longitude })
        }, (err: GeolocationPositionError) => {
            alert(err.message)
        })
    }

    const renderInputField = () => {
        if (inputMethod == "cords") {
            return <CordsInput cords={cords} setCords={setCords} />
        } else if (inputMethod == "city") {
            return <CityInput city={city} setCity={setCity} />
        } else if (inputMethod == "location") {
            locateUser()
            return <CordsInput cords={cords} setCords={setCords} isEditable={false} />
        }
    }

    const renderWeatherData = () => {
        return <div></div>
    }

    const onInputMethodSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMethod(e.target.value as InputMethod)
    }

    return (
        <Grid2 container direction={"column"} alignItems={"center"}>
            <FormControl>
                <FormLabel>Select input method:</FormLabel>
                <RadioGroup row={true} defaultValue={"cords"} onChange={onInputMethodSelected}>
                    <FormControlLabel value="cords" control={<Radio />} label="Coordinates" />
                    <FormControlLabel value="city" control={<Radio />} label="City" />
                    <FormControlLabel value="location" control={<Radio />} label="Use my location" />
                </RadioGroup>
            </FormControl>
            <Grid2>
                {renderInputField()}
            </Grid2>
            <Grid2>
                <Button
                    variant="contained"
                    disabled={isLoadingWeather}
                    onClick={loadWeather}>
                    {isLoadingWeather ? "Loading..." : "Submit"}
                </Button>

            </Grid2>

            <Grid2>
                {renderWeatherData()}
            </Grid2>
        </Grid2>
    );
};

export default WeatherPage;
