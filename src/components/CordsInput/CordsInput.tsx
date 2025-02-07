import { Container, Grid2, TextField } from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler, useContext, useState } from 'react';
import { Coordinates } from '../../types/weather-types';
import InputContext from '../../context/InputContext';

interface Props {
    isEditable?: boolean
}

const CordsInput: React.FC<Props> = ({ isEditable = true }) => {
    const {cords, setCords} = useContext(InputContext);
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
                    disabled={!isEditable}
                    variant="outlined"
                    value={`${cords.latitude}`}
                    onChange={onCordsChanged} />
            </Grid2>
            <Grid2>
                <TextField
                    type='number'
                    label="Longitude"
                    id="longitude"
                    disabled={!isEditable}
                    variant="outlined"
                    value={`${cords.longitude}`}
                    onChange={onCordsChanged} />
            </Grid2>
        </Grid2>
    );
};

export default CordsInput;
