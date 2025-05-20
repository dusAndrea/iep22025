<template>

  <v-container fluid>
    <div class="dashboard">
      <CO2Calculator class="dashboard__emission" />

      <BarChart class="dashboard__barchar" />

      <LineChart class="dashboard__linechart" />
    </div>
  </v-container>

</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BarChart, CO2Calculator, LineChart } from '@/components';

  export default defineComponent({
    name: 'DashBoard',
    components: {
      BarChart,
      CO2Calculator,
      LineChart,
    },
  });
</script>
<style scoped lang="scss">
  .dashboard {
    display: grid;
    grid-template-columns: 60% 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 2rem;
    grid-template-areas:
      "Emission Line"
      "Emission Barchart";

    &__emission {
      grid-area: Emission;
    }

    &__linechart {
      grid-area: Line;
    }

    &__barchart {
      grid-area: Barchart;
    }
  }
</style>
