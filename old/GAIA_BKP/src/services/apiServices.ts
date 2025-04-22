// src/services/apiService.js

// CUSTOM APIKEY FROM https://openweathermap.org
const WEATHER_API_KEY = '567fec87388f2edfbd853e588c877b20'
// ROME
const WEATHER_LAT = 41.9
const WEATHER_LON = 12.5

const CARBON_API_URL = 'https://api.carbonintensity.org.uk/intensity'
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${WEATHER_API_KEY}`

export async function fetchCarbonIntensity() {
  try {
    const res = await fetch(CARBON_API_URL)
    const data = await res.json()
    const values = data.data || []
    return values.map((entry) => ({
      time: entry.from,
      value: entry.intensity.actual
    }))
  } catch (e) {
    console.error('Errore caricamento carbon intensity:', e)
    return []
  }
}

export async function fetchWeatherData() {
  try {
    const res = await fetch(WEATHER_API_URL)
    const data = await res.json()
    const values = data.list || []
    return values.map((entry) => ({
      time: entry.dt_txt,
      value: entry.main.temp
    }))
  } catch (e) {
    console.error('Errore caricamento dati meteo:', e)
    return []
  }
}
