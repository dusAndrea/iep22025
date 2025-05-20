<template>
  <v-card color="transparent"
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
  import { onMounted, ref, watch, defineComponent } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import { fetchCarbonIntensity } from '@/services/api';


  export default defineComponent({
    name: 'BarChart',
    setup(props) {


      Chart.register(...registerables);
      const carbonData = ref([]);
      const canvas = ref(null);

      let chart = null;
      const title = 'Emissioni di CO₂';
      const renderChart = () => {
        if (chart) {
          chart.destroy();
        }
        if (!canvas.value) {
          return;
        }

        const ctx = canvas.value.getContext('2d');

        chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: carbonData.value.map(d => d.label),
            datasets: [{
              label: title,
              data: carbonData.value.map(d => d.value),
              backgroundColor: '#4CAF50'
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
        renderChart();
        carbonData.value = await fetchCarbonIntensity();
      });

      watch(() => carbonData.value, renderChart);

      return {
        title,
        canvas,
        renderChart
      };
    }
  });
</script>
