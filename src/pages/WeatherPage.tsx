import { Button, FormControl, FormControlLabel, FormLabel, Grid2, MenuItem, Radio, RadioGroup, Select, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';
import CordsInput from '../components/CordsInput/CordsInput';
import CityInput from '../components/CityInput/CityInput';
import { WeatherData } from '../types/weather-types';
import { fetchWeather } from '../util/WeatherService';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import WeatherDataContext from '../context/WeatherDataContext';
import InputContext from '../context/InputContext';

type InputMethod = "cords" | "city" | "location";

interface Props {

}

const WeatherPage: React.FC<Props> = ({ }) => {
    const {inputMethod, setInputMethod} = useContext(InputContext)
    const {city, setCity} = useContext(InputContext)
    const {cords, setCords} = useContext(InputContext)
    const {weatherData, setWeatherData} = useContext(WeatherDataContext);
    const {currentError, setCurrentError} = useContext(InputContext)
    const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false)
    const [daysToShow, setDaysToShow] = useState<number>(7)

    const loadWeather = async () => {
        setIsLoadingWeather(true)
        setWeatherData([])
        const result = await fetchWeather({ city: city, coordinates: cords })
        setIsLoadingWeather(false)
        setWeatherData(result.weatherData)
        setCurrentError(result.errorMessage)
    }

    const renderInputField = () => {
        if (inputMethod == "cords") {
            return <CordsInput />
        } else if (inputMethod == "city") {
            return <CityInput city={city} setCity={setCity} />
        } else if (inputMethod == "location") {
            return <CordsInput isEditable={false} />
        }
    }

    const renderWeatherData = () => {
        if (weatherData.length == 0) {
            if (currentError && currentError != "") {
                return <span style={{color: "red"}}>{currentError}</span>
            } else {
                return ''
            }
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
                    disabled={(isLoadingWeather || currentError != "" )}
                    onClick={loadWeather}>
                    {isLoadingWeather ? "Loading..." : "Submit"}
                </Button>

            </Grid2>

            {renderWeatherData()}
        </Grid2>
    );
};

export default WeatherPage;
