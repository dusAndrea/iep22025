import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useMessagesStore } from '@/stores/messages';

export function useClimateClock() {
  const countdown = ref(null);
  const renewableShare = ref(null);
  const loading = ref(true);
  const timerModule = ref(null);
  const valueModule = ref(null);
  const CLIMATE_URL = 'https://api.climateclock.world/v2/clock.json';
  const feedbackStore = useMessagesStore();

  const fetchData = async () => {
    loading.value = true;

    try {
      const response = await axios.get(CLIMATE_URL);
      const data = response.data;
      console.log('data', data);

      timerModule.value = data.modules.find(mod => mod.type === 'timer');
      valueModule.value = data.modules.find(mod => mod.type === 'value');

      if (timerModule.value) {
        countdown.value = timerModule.value.data[0].value;
      }

      if (valueModule.value) {
        renewableShare.value = valueModule.value.data[0].value;
      }
    } catch (error) {
      feedbackStore.showMessage('Errore nel recupero dei dati Climate Clock');
    }
  };

  onMounted(fetchData);

  return {
    countdown,
    renewableShare,
    loading,
    timerModule,
  };
}
