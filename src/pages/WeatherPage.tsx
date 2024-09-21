import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid2, MenuItem, Radio, RadioGroup, Select, Stack } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CordsInput from '../components/CordsInput/CordsInput';
import CityInput from '../components/CityInput/CityInput';
import { Coordinates, WeatherData } from '../types/weather-types';
import { fetchWeather } from '../util/WeatherService';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import { City } from 'country-state-city';
import WeatherDataContext from '../context/WeatherDataContext';

type InputMethod = "cords" | "city" | "location";

interface Props {

}

const WeatherPage: React.FC<Props> = ({ }) => {
    const [inputMethod, setInputMethod] = useState<InputMethod>("cords")
    const [city, setCity] = useState<string>("")
    const [cords, setCords] = useState<Coordinates>({ "latitude": 0, "longitude": 0 })
    
    const weatherData = useContext(WeatherDataContext).weatherData;
    const setWeatherData = useContext(WeatherDataContext).setWeatherData;
    
    const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false)
    const [daysToShow, setDaysToShow] = useState<number>(7)

    // Clear fields when input method changes
    useEffect(() => {
        setCity("")
        setCords({ "latitude": 0, "longitude": 0 })
    }, [inputMethod])

    const loadWeather = async () => {
        setIsLoadingWeather(true)
        setWeatherData([])
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
        if (weatherData.length == 0) {
            return ''
        }
        return <div>
            <FormControl size='small'>
                <Stack direction={'row'} alignItems={"center"} gap={1}>
                    <span>Show</span>
                    <Select
                        value={daysToShow}
                        onChange={(e) => { setDaysToShow(parseInt(e.target.value as string)) }}
                    >
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                    </Select>
                    <span>Days</span>
                </Stack>
            </FormControl>
            <Stack direction={'row'} gap={1}>
                {
                    weatherData.map((val: WeatherData, key: number, arr) => {
                        if (key < daysToShow) {
                            return <WeatherCard key={key} weatherData={val}></WeatherCard>
                        } else {
                            return ''
                        }

                    })
                }
            </Stack>
        </div>
    }

    const onInputMethodSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMethod(e.target.value as InputMethod)
    }

    return (
        <Grid2 container direction={"column"} alignItems={"center"} gap={3}>
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

            {renderWeatherData()}
        </Grid2>
    );
};

export default WeatherPage;
