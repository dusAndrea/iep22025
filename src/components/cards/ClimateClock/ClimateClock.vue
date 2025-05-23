<template>
  <DefaultCardWrapper :title="title"
    :subtitle="subtitle">
    <template #cardContent>
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold">Neutralità Carbonica</h2>
          <p><strong>Data Obiettivo:</strong> {{ carbonDeadline || 'Caricamento...' }}</p>
          <p><strong>Countdown:</strong> {{ carbonCountdown }}</p>
        </div>

        <div>
          <h2 class="text-xl font-bold">Energia 100% Rinnovabile</h2>
          <p><strong>Data Obiettivo:</strong> {{ renewablesDeadline || 'Caricamento...' }}</p>
          <p><strong>Countdown:</strong> {{ renewablesCountdown }}</p>
        </div>
      </div>

    </template>
  </DefaultCardWrapper>

</template>

<script lang="ts">
  import { ref, defineComponent, type PropType, onMounted, onBeforeUnmount } from 'vue';
  import DefaultCardWrapper from '../DefaultCardWrapper.vue';
  import axios from 'axios';
  import type { ColorAvailable } from '@/types';

  export default defineComponent({
    name: 'ClimateClock',
    components: {
      DefaultCardWrapper
    },
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: true
      },
      color: {
        type: String as PropType<ColorAvailable>,
      }
    },
    setup() {
      const carbonDeadline = ref<string | null>(null);
      const renewablesDeadline = ref<string | null>(null);
      const carbonCountdown = ref('');
      const renewablesCountdown = ref('');
      let intervalCarbon: number | null = null;
      let intervalRenewables: number | null = null;

      const fetchData = async () => {
        try {
          const res = await axios.get('https://api.climateclock.world/v2/clock.json');
          const data = res.data;

          carbonDeadline.value = data.data?.modules.carbon_deadline_1.timestamp; // es: "2030-12-31T23:59:59Z"
          renewablesDeadline.value = data.data.modules.renewables_1.timestamp;
          startCountdowns();
        } catch (error) {
          console.error('Errore nel recupero dei dati:', error);
        }
      };

      const createCountdown = (targetDate: string, refToUpdate: typeof carbonCountdown, intervalVar: 'carbon' | 'renewables') => {
        const target = new Date(targetDate).getTime();

        const update = () => {
          const now = new Date().getTime();
          const distance = target - now;

          if (distance <= 0) {
            refToUpdate.value = 'Obiettivo raggiunto';
            if (intervalVar === 'carbon') clearInterval(intervalCarbon!);
            else clearInterval(intervalRenewables!);
            return;
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          refToUpdate.value = `${days}g ${hours}h ${minutes}m ${seconds}s`;
        };

        update();
        const id = setInterval(update, 1000);
        if (intervalVar === 'carbon') intervalCarbon = id;
        else intervalRenewables = id;
      };

      const startCountdowns = () => {
        if (carbonDeadline.value) {
          createCountdown(carbonDeadline.value, carbonCountdown, 'carbon');
        }
        if (renewablesDeadline.value) {
          createCountdown(renewablesDeadline.value, renewablesCountdown, 'renewables');
        }
      };

      onBeforeUnmount(() => {
        if (intervalCarbon) clearInterval(intervalCarbon);
        if (intervalRenewables) clearInterval(intervalRenewables);
      });

      onMounted(() => {
        fetchData();
        // try {
        //   const res = await fetch('https://api.climateclock.world/v2/clock.json');

        //   const data = await res.json();

        //   const modules = data.data.modules;

        //   carbonDeadline.value = modules.carbon_deadline_1;
        //   renewables.value = modules.renewables_1;


        // } catch (err) {
        //   error.value = 'Errore nel caricamento dei dati Climate Clock.';
        //   console.error(err);
        // } finally {
        //   loading.value = false;
        // }
      });

      return {
        carbonDeadline,
        carbonCountdown,
        renewablesDeadline,
        renewablesCountdown
      };
    }
  });
</script>
