import { Container, Grid2, TextField } from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { Coordinates } from '../../types/weather-types';

interface Props {
    cords: Coordinates,
    setCords: (val: Coordinates) => void
}

const CordsInput: React.FC<Props> = ({ cords, setCords }) => {
    const onCordsChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        let newLatitude = e.target.id === "latitude" ? parseFloat(newValue) : cords.latitude
        let newLongitude = e.target.id === "longitude" ? parseFloat(newValue) : cords.longitude
        setCords({ "latitude": newLatitude, "longitude": newLongitude })

    }

    return (
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid2>
                <TextField
                    type='number'
                    label="Latitude"
                    id="latitude"
                    variant="outlined"
                    value={`${cords.latitude}`}
                    onChange={onCordsChanged} />
            </Grid2>
            <Grid2>
                <TextField
                    type='number'
                    label="Longitude"
                    id="longitude"
                    variant="outlined"
                    value={`${cords.longitude}`}
                    onChange={onCordsChanged} />
            </Grid2>
        </Grid2>
    );
};

export default CordsInput;
