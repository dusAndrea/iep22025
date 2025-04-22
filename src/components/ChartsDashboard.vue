<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-4"
          outlined>
          <v-card-title>Emissioni di CO₂</v-card-title>
          <v-card-text>
            <BarChart title="Emissioni di CO₂"
              :data="carbonData"
              label="gCO₂/kWh" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-4"
          outlined>
          <v-card-title>Dati Meteo</v-card-title>
          <v-card-text>
            <LineChart title="Temperatura"
              :data="weatherData"
              label="°C" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-4"
          outlined>
          <v-card-title>Calcolo Percorso</v-card-title>
          <v-card-text>
            <EmissionCalculator />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts">
  import { ref, onMounted, defineComponent } from 'vue'
  import BarChart from './charts/BarChart.vue'
  import LineChart from './charts/LineChart.vue'
  import { fetchCarbonIntensity, fetchWeatherData } from '@/services/apiServices'
  import EmissionCalculator from './EmissionCalculator.vue'
  export default defineComponent({
    name: 'ChartsDashboard',
    components: {
      BarChart,
      LineChart,
      EmissionCalculator,
    },
    setup() {
      const carbonData = ref([])
      const weatherData = ref([])
      onMounted(async () => {
        carbonData.value = await fetchCarbonIntensity()
        weatherData.value = await fetchWeatherData()
      })

      return {
        carbonData,
        weatherData
      }
    }
  })


</script>

<style scoped>
  .v-card {
    background-color: rgba(255, 255, 255, 0.95);
  }
</style>
