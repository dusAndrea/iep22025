import axios from 'axios';
import { useFeedbackStore } from "@/stores";

// CUSTOM APIKEY FROM https://openweathermap.org
const WEATHER_API_KEY = '567fec87388f2edfbd853e588c877b20';

// ROME
const WEATHER_LAT = 41.9;
const WEATHER_LON = 12.5;

const CARBON_API_URL = 'https://api.carbonintensity.org.uk/intensity';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${WEATHER_LAT}&lon=${WEATHER_LON}&units=metric&appid=${WEATHER_API_KEY}`;
const OPENROUTESERVICE_API_URL = 'https://api.openrouteservice.org/v2/directions/driving-car';
const OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf6248350a055ef9cd402b906676eb2e1c2c56';
const CLIMATIQ_API_KEY = 'K6KQHH1NGN65Q4EA01P6DWN7YG';

export async function fetchCarbonIntensity() {
  const feedbackStore = useFeedbackStore();

  try {
    // const res = await fetch(CARBON_API_URL)
    const res = await axios.get(CARBON_API_URL);
    const data = await res.json();
    const values = data.data || [];

    return values.map((entry) => ({
      time: entry.from,
      value: entry.intensity.actual
    }));
  } catch (e) {
    feedbackStore.showMessage(`Errore caricamento carbon intensity: ${e}`, 'warning');
    return [];
  }
}

export async function fetchWeatherData() {
  const feedbackStore = useFeedbackStore();

  try {
    // const res = await fetch(WEATHER_API_URL)
    const res = await axios.get(WEATHER_API_URL);
    const data = await res.json();
    const values = data.list || [];
    return values.map((entry) => ({
      time: entry.dt_txt,
      value: entry.main.temp
    }));
  } catch (e) {
    feedbackStore.showMessage(`Errore caricamento dati meteo: ${e}`, 'warning');
    return [];
  }
}
