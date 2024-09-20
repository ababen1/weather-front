import { Card, CardContent, CardHeader, List, ListItemText, Typography } from "@mui/material";
import { WeatherData } from "../../types/weather-types";

interface Props {
    weatherData: WeatherData
}

const WeatherCard: React.FC<Props> = ({ weatherData }) => {

    const getWeatherConditions = (): string => {
        let conditions = ""
        if (weatherData.rain > 0) {
            conditions += `Rain (${weatherData.rain}mm)`
        }
        if (weatherData.snowfall > 0) {
            conditions += `Snow (${weatherData.snowfall}mm)`
        }
        if (conditions == "") {
            conditions = "None"
        }
        return conditions
    }

    return (
        <Card variant="elevation">
            <CardContent>
                <Typography variant="h6" component="div">
                    {`Weather for ${new Date(weatherData.time).toLocaleDateString()}`}
                </Typography>
                <List>
                    <ListItemText>{`Tempature: ${weatherData.temperature}°C`}</ListItemText>
                    <ListItemText>{`Humidity: ${weatherData.humidity}%`}</ListItemText>
                    <ListItemText>{`Wind Speed: ${weatherData.wind_speed} km/h`}</ListItemText>
                    <ListItemText>{`Weather conditions: ${getWeatherConditions()}`}</ListItemText>

                </List>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
