import { Container, Grid2, TextField } from '@mui/material';
import React from 'react';

interface Props {
    latitude: number,
    longitude: number
}

const CordsInput: React.FC<Props> = ({ latitude = 0, longitude = 0 }) => {
    // Add your component logic here, like state, effects, etc.

    return (
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid2>
                <TextField label="Latitude" variant="outlined" value={latitude} />
            </Grid2>
            <Grid2>
                <TextField label="Longitude" variant="outlined" value={longitude} />
            </Grid2>
        </Grid2>
    );
};

export default CordsInput;
