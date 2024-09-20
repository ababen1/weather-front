import axios, { AxiosResponse } from "axios";
import { WeatherRequestData, WeatherData } from "../types/weather-types";

const URL_DEV = "http://localhost:8000/"
const URL_PROD = ""

export const fetchWeather = async(data: WeatherRequestData): Promise<WeatherData[]>  =>{
    
    let url: string 
    let weather: WeatherData[] = []

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        url = URL_DEV
    } else {
        url = URL_PROD
    }

    url += "weather/"

    try {
        const response: AxiosResponse = await axios.post(url, data, {
            "headers": {
                "X-CSRFToken": getCSRFToken()
            }
        })
        weather = response.data

    } catch (error) {
        console.log(error)
    }

    return weather
}

function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue;
}
