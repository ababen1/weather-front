import { createContext, ReactNode, useEffect, useState } from 'react';
import { Coordinates } from '../types/weather-types';

type InputMethod = "cords" | "city" | "location";

interface IInputContext {
    inputMethod: InputMethod,
    setInputMethod: (val: InputMethod) => void,
    city: string,
    setCity: (val: string) => void,
    cords: Coordinates,
    setCords: (val: Coordinates) => void,
    currentError: string,
    setCurrentError: (val: string) => void
}

export const InputContext = createContext<IInputContext>({
    inputMethod: 'cords',
    setInputMethod: (val) => { },
    city: "",
    setCity: (val) => { },
    cords: { latitude: 0, longitude: 0 },
    setCords: (val) => { },
    currentError: "",
    setCurrentError: (val) => { }
});


// provider component
export const InputProvider = ({ children }: { children: ReactNode }) => {
    const [inputMethod, setInputMethod] = useState<InputMethod>('cords');
    const [city, setCity] = useState<string>('');
    const [cords, setCords] = useState<Coordinates>({ latitude: 0, longitude: 0 });
    const [currentError, setCurrentError] = useState<string>("")

    const locateUser = () => {
        navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
            setCords({ "latitude": pos.coords.latitude, "longitude": pos.coords.longitude })
        }, (err: GeolocationPositionError) => {
            switch (err.code) {
                case err.PERMISSION_DENIED:
                    setCurrentError("Premission to use geolocation denied. Please allow geolocation")
                    break;
                case err.POSITION_UNAVAILABLE, err.TIMEOUT:
                    setCurrentError("Cannot locate")
                    break;
                default:
                    setCurrentError("")
            }
        })
    }

    useEffect(() => {
        const isValidLatitude = !(cords.latitude > 90) && !(cords.latitude < -90)
        const isValidLongitude = !(cords.longitude > 180) && !(cords.longitude < -180)
        if (!isValidLatitude || !isValidLongitude) {
            setCurrentError("Invalid coordinates: latitude must be between -90 and 90, and longitude between -180 and 180")
        } else {
            setCurrentError("")
        }
    }, [cords])

    useEffect(() => {
        if (inputMethod == "city") {
            if (city.length < 1) {
                setCurrentError("Please enter a city")
            } else {
                setCurrentError("")
            }
        }
    }, [city])

    useEffect(() => {
        switch (inputMethod) {
            case "city":
                setCords({ latitude: 0, longitude: 0 })
                break;
            case "cords":
                setCity("")
                break
            case "location":
                setCity("")
                locateUser()
                break
            default:
                break;
        }
    }, [inputMethod])



    return (
        <InputContext.Provider value={{ inputMethod, setInputMethod, city, setCity, cords, setCords, currentError, setCurrentError }}>
            {children}
        </InputContext.Provider>
    );
};

export default InputContext;