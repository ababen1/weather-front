import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { City, ICity } from 'country-state-city';
import React from 'react';


interface Props {
    city: string,
    setCity: (val: string) => void
}

const cities: ICity[] = City.getAllCities()
const memoizedCities = React.useMemo(() => (
    cities.map((val: ICity, idx: number) => (
      <MenuItem key={idx} value={val.name}>
        {val.name}
      </MenuItem>
    ))
  ), []);

const CityInput: React.FC<Props> = ({ city, setCity }) => {
    const onCityChanged = (e: SelectChangeEvent) => {
        setCity(e.target.value)
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select">City</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="Age"
                onChange={onCityChanged}
            >
                {memoizedCities}
            </Select>
        </FormControl>
    );
};

export default CityInput;
