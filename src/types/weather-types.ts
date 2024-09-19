export interface Coordinates {
    latitude: number,
    longitude: number
}
export interface WeatherData {
    coordinates: Coordinates,
    temperature: number,
    humidity: number,
    windSpeed: number,
    rain: number,
    snowfall: number,
  }