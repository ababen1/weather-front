import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import CordsInput from '../components/CordsInput/CordsInput';

interface Props {

}

const WeatherPage: React.FC<Props> = ({ }) => {
    // Add your component logic here, like state, effects, etc.

    return (
        <Container>
            <FormControl>
                <FormLabel>Select input method:</FormLabel>
                <RadioGroup row={true} defaultValue={"cords"}>
                    <FormControlLabel value="cords" control={<Radio />} label="Coordinates" />
                    <FormControlLabel value="city" control={<Radio />} label="City" />
                    <FormControlLabel value="location" control={<Radio />} label="Use my location" />
                </RadioGroup>
            </FormControl>
            <CordsInput latitude={0} longitude={0} />
        </Container>
    );
};

export default WeatherPage;
