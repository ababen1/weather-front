import { Container, FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import CordsInput from '../components/CordsInput/CordsInput';
import CityInput from '../components/CityInput/CityInput';
import { Coordinates } from '../types/weather-types';

type InputMethod = "cords" | "city" | "location";

interface Props {

}

const WeatherPage: React.FC<Props> = ({ }) => {
    // Add your component logic here, like state, effects, etc.

    const [inputMethod, setInputMethod] = useState<InputMethod>("cords")
    const [city, setCity] = useState<string>("")
    const [cords, setCords] = useState<Coordinates>({ "latitude": 0, "longitude": 0 })

    const renderInputField = () => {
        if (inputMethod == "cords") {
            return <CordsInput latitude={0} longitude={0} />
        } else if (inputMethod == "city") {
            return <CityInput city={city} setCity={setCity} />
        } else if (inputMethod == "location") {
            return <div></div>
        }
    }

    const onInputMethodSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMethod(e.target.value as InputMethod)
    }

    return (
        <Container>
            <Grid2 container direction={"column"} alignItems={"center"} justifySelf={"center"}>
                <FormControl>
                    <FormLabel>Select input method:</FormLabel>
                    <RadioGroup row={true} defaultValue={"cords"} onChange={onInputMethodSelected}>
                        <FormControlLabel value="cords" control={<Radio />} label="Coordinates" />
                        <FormControlLabel value="city" control={<Radio />} label="City" />
                        <FormControlLabel value="location" control={<Radio />} label="Use my location" />
                    </RadioGroup>
                </FormControl>
                {renderInputField()}
            </Grid2>
        </Container>
    );
};

export default WeatherPage;
