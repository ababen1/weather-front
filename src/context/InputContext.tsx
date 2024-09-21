import { createContext, ReactNode, useState } from 'react';
import { Coordinates } from '../types/weather-types';

type InputMethod = "cords" | "city" | "location";

interface IInputContext {
    inputMethod: InputMethod,
    setInputMethod: (val: InputMethod) => void,
    city: string,
    setCity: (val: string) => void,
    cords: Coordinates,
    setCords: (val: Coordinates) => void
}

export const InputContext = createContext<IInputContext>({
    inputMethod: 'cords',
    setInputMethod: (val) => {},
    city: "",
    setCity: (val) => {},
    cords: {latitude: 0, longitude: 0},
    setCords: (val) => {}
});


// provider component
export const InputProvider = ({ children }: { children: ReactNode }) => {
    const [inputMethod, setInputMethod] = useState<InputMethod>('cords');
    const [city, setCity] = useState<string>('');
    const [cords, setCords] = useState<Coordinates>({ latitude: 0, longitude: 0 });

    return (
        <InputContext.Provider value={{ inputMethod, setInputMethod, city, setCity, cords, setCords }}>
            {children}
        </InputContext.Provider>
    );
};

export default InputContext;