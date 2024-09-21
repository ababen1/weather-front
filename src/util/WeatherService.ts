import axios, { AxiosError, AxiosResponse } from "axios";
import { WeatherRequestData, WeatherData } from "../types/weather-types";

const URL_DEV = "http://localhost:8000/"
const URL_PROD = ""

interface WeatherResponse {
    success: boolean,
    weatherData: WeatherData[],
    errorMessage: string
}

export const fetchWeather = async (data: WeatherRequestData): Promise<WeatherResponse> => {

    let url: string
    let results: WeatherResponse = { success: false, weatherData: [] , errorMessage: ""}

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        url = URL_DEV
    } else {
        url = URL_PROD
    }

    url += "weather/"

    try {
        const response: AxiosResponse<WeatherData[]> = await axios.post(url, data, {
            "headers": {
                "X-CSRFToken": getCSRFToken()
            }
        })
        if (response.status == 200) {
            results.weatherData = response.data
            results.success = true
        }

    } catch (e: any) {
        if (e.response && e.response.data) {
            results.errorMessage = e.response.data.error;
        } else {
            results.errorMessage = "An unknown error occurred.";
        }
        console.log(e)
    }

    return results
}

function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue;
}
