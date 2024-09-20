import { Autocomplete, Container, FilterOptionsState, FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { City, ICity } from 'country-state-city';
import React, { useEffect, useState } from 'react';


interface Props {
    city: string,
    setCity: (val: string) => void
}

const CityInput: React.FC<Props> = ({ city, setCity }) => {
    return (
        <TextField
            label="Enter a city"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}></TextField>
    );
};

export default CityInput;