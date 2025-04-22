<template>
  <v-card class="pa-4"
    outlined>
    <v-card-title>Mappa Interattiva</v-card-title>
    <v-card-text>
      <l-map style="height: 400px"
        :zoom="5"
        :center="[41.9, 12.5]">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors" />
        <l-marker :lat-lng="[41.9, 12.5]">
          <l-popup>Roma</l-popup>
        </l-marker>
      </l-map>
    </v-card-text>
  </v-card>
</template>

<script setup>
  // import 'leaflet/dist/leaflet.css'
  import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
</script>

<style scoped>
  .v-card {
    background-color: rgba(255, 255, 255, 0.95);
  }
</style>
