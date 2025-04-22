<template>
  <v-card class="mb-4">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <canvas ref="canvas" height="200"></canvas>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  data: Array,
  title: String,
  color: String
})

const canvas = ref(null)
let chart = null

const renderChart = () => {
  if (chart) chart.destroy()
  const ctx = canvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map(d => d.label),
      datasets: [{
        label: props.title,
        data: props.data.map(d => d.value),
        fill: false,
        borderColor: props.color || '#009688',
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
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart)
</script>