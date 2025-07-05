import axios from 'axios';
import { useMessagesStore } from "@/stores";

const CARBON_API_URL = 'https://api.carbonintensity.org.uk/intensity';

export const OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf6248350a055ef9cd402b906676eb2e1c2c56';

export async function fetchCarbonIntensity() {
  const feedbackStore = useMessagesStore();

  try {
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
