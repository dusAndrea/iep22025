<template>
  <main>
    <ChartsDashboard />
  </main>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { ChartsDashboard } from '@/components';
  export default defineComponent({
    name: 'DashBoard',
    components: {
      ChartsDashboard
    },
    setup() {
      return {

      }
    }
  });
</script>
