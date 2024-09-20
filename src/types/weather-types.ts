export interface Coordinates {
    latitude: number,
    longitude: number
}
export interface WeatherData {
    time: Date,
    temperature: number,
    humidity: number,
    wind_speed: number,
    rain: number,
    snowfall: number,
  }

  export interface WeatherRequestData {
    coordinates?: Coordinates,
    city?: string,
  }