<template>
  <v-card color="primary"
    outlined
    class="pa-4">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <canvas ref="canvas"
        height="200"></canvas>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { Chart, registerables, } from 'chart.js';
  import { defineComponent } from 'vue';
  import { fetchWeatherData } from '@/services/api';
  export default defineComponent({
    name: 'LineChart',
    props: {},
    setup() {
      const canvas = ref(null);
      const chart = null;
      const label = "°C";
      const weatherData = ref([]);
      const title = ref("Temperature");
      const color = ref("#009688");

      Chart.register(...registerables);

      const renderChart = () => {
        if (chart) {
          chart.destroy();
        }

        const ctx = canvas.value.getContext('2d');

        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: weatherData.value.map(d => d.label),
            datasets: [{
              label: title.value,
              data: weatherData.value.map(d => d.value),
              fill: false,
              borderColor: color.value || '#009688',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { ticks: { autoSkip: false } },
              y: { beginAtZero: true }
            }
          }
        });
      };

      onMounted(async () => {
        weatherData.value = await fetchWeatherData();
        renderChart();
      });

      watch(() => weatherData.value, renderChart);

      return {
        canvas,
        chart,
        renderChart,
        title
      };
    }
  });










</script>
