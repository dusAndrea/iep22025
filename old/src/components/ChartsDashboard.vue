<template>
  <v-card class="pa-4"
    outlined>
    <v-card-title>Emissioni di CO₂ e Dati Meteo</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12"
          md="6">
          <!-- <BarChart title="Emissioni di CO₂"
            :data="carbonData"
            label="gCO₂/kWh" /> -->
        </v-col>
        <v-col cols="12"
          md="6">
          <!-- <LineChart title="Temperatura"
            :data="weatherData"
            label="°C" /> -->
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { ref, onMounted, defineComponent } from 'vue'
  /* import BarChart from './charts/BarChart.vue'
  import LineChart from './charts/LineChart.vue' */
  import { fetchCarbonIntensity, fetchWeatherData } from '@/services/apiServices'

  export default defineComponent({
    setup() {
      const carbonData = ref([])
      const weatherData = ref([])

      onMounted(async () => {
        carbonData.value = await fetchCarbonIntensity()
        weatherData.value = await fetchWeatherData()
      })

      return { carbonData, weatherData }
    }
  })
</script>

<style scoped>
  .v-card {
    background-color: rgba(255, 255, 255, 0.95);
  }
</style>
