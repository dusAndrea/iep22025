<!-- components/Home.vue -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12"
        md="6">
        <ChartsDashboard />
      </v-col>
      <v-col cols="12"
        md="6">
        <MapView />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ChartsDashboard, MapView } from '@/components'
</script>
