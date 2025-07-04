<template>
  <DefaultCardWrapper :title="title"
    :subtitle="subtitle">
    <template #cardContent>
      <v-container fluid>
        <v-row>
          <v-col cols="12"
            lg="6">
            <v-autocomplete v-model="startQuery"
              :items="startSuggestions"
              label="Digita l'indirizzo di partenza"
              :loading="loadingStart"
              @update:search="handleStartSearch"
              item-title="display_name"
              item-value="display_name"
              outlined />
          </v-col>
          <v-col cols="12"
            lg="6">
            <v-autocomplete v-model="endQuery"
              :items="endSuggestions"
              label="Digita l'indirizzo di arrivo"
              :loading="loadingEnd"
              @update:search="handleEndSearch"
              item-title="display_name"
              item-value="display_name"
              outlined />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select v-model="travelChoice"
              :items="travelMode"
              label="Che mezzo usi?"
              outlined />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-select :disabled="travelChoice !== 'car'"
              v-model="carChoiceChoice"
              :items="carType"
              label="Che tipo di auto hai??"
              outlined />
          </v-col>
          <v-col cols="6">
            <v-select :disabled="travelChoice !== 'car'"
              v-model="carSizeChoice"
              :items="carSize"
              label="Che dimensioni ha la tua auto?"
              outlined />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <CO2CarsDialog />
          </v-col>

          <v-col class="d-flex justify-end">
            <v-btn color="primary"
              :disabled="!startQuery || !endQuery"
              :loading="loadingStart || loadingEnd"
              @click="calculateEmissions">
              Calcola
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-alert v-if="result"
        type="info"
        class="mt-4"
        border="start"
        border-color="green">
        Hai percorso {{ result.distance.toFixed(2) }} km e prodotto
        circa <strong>{{ result.emissions.toFixed(2) }} kg</strong> di CO₂.
      </v-alert>

      <v-alert v-if="error"
        type="error"
        class="mt-4">
        {{ error }}
      </v-alert>
    </template>
  </DefaultCardWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import debounce from 'lodash.debounce';
  import CO2CarsDialog from './CO2CarsDialog.vue';
  import DefaultCardWrapper from './DefaultCardWrapper.vue';

  export default defineComponent({
    name: 'CO2Calculator',
    components: {
      DefaultCardWrapper,
      CO2CarsDialog
    },
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: true
      }
    },
    setup() {
      const startQuery = ref();
      const endQuery = ref();
      const startSuggestions = ref([]);
      const endSuggestions = ref([]);
      const loadingStart = ref(false);
      const loadingEnd = ref(false);
      const result = ref(null);
      const error = ref('');

      const startController = ref<AbortController | null>(null);
      const endController = ref<AbortController | null>(null);
      const OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf6248350a055ef9cd402b906676eb2e1c2c56';

      const travelChoice = ref<string | null>(null);

      const travelMode = [
        { title: 'Auto', value: 'car' },
        { title: 'Treno', value: 'rail' },
        { title: 'Aereo', value: 'air' }
      ];

      const carChoiceChoice = ref<string | null>(null);
      const carSizeChoice = ref<string | null>(null);

      const carSize = [
        { title: 'Piccola', value: 'small' },
        { title: 'Media', value: 'medium' },
        { title: 'Grande', value: 'large' }
      ];

      const carType = [
        { title: 'Benzina', value: 'petrol' },
        { title: 'Diesel', value: 'diesel' },
        { title: 'Ibrida', value: 'hybrid' },
        { title: 'Ibrida Plug-in', value: 'plugin_hybrid' },
        { title: 'Non so (Verrà calcolata una media)', value: 'average' },
        { title: 'Elettrica', value: 'battery' }
      ];

      const searchPlaces = async (query: string, controllerRef, suggestionsRef, loadingRef) => {
        if (query.length < 3) return;

        error.value = '';
        loadingRef.value = true;
        if (controllerRef.value) controllerRef.value.abort();

        controllerRef.value = new AbortController();
        try {
          const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
            signal: controllerRef.value.signal,
            params: {
              q: query,
              format: 'json',
              addressdetails: 1,
              limit: 10
            }
          });
          suggestionsRef.value = data;
        } catch (err) {
          if (!axios.isCancel(err)) {
            error.value = 'Errore durante la ricerca degli indirizzi.';
            console.error(err);
          }
        } finally {
          loadingRef.value = false;
        }
      };

      const debouncedStartSearch = debounce((q) =>
        searchPlaces(q, startController, startSuggestions, loadingStart), 400);
      const debouncedEndSearch = debounce((q) =>
        searchPlaces(q, endController, endSuggestions, loadingEnd), 400);

      const handleStartSearch = (query: string) => {
        if (query.length < startQuery.value.length) return; // evita se sta cancellando
        debouncedStartSearch(query);
      };

      const handleEndSearch = (query: string) => {
        if (query.length < endQuery.value.length) return;
        debouncedEndSearch(query);
      };

      const calculateEmissions = async () => {
        error.value = '';
        const start = startSuggestions.value.find(s => s.display_name === startQuery.value);
        const end = endSuggestions.value.find(e => e.display_name === endQuery.value);
        if (!start || !end) {
          error.value = 'Seleziona indirizzi validi dai suggerimenti.';
          return;
        }

        try {
          const res = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car',
            {
              coordinates: [
                [parseFloat(start.lon), parseFloat(start.lat)],
                [parseFloat(end.lon), parseFloat(end.lat)]
              ]
            },
            {
              headers: {
                Authorization: OPENROUTESERVICE_API_KEY,
                'Content-Type': 'application/json'
              }
            }
          );

          const distanceKm = res.data.routes[0].summary.distance / 1000;
          const emissionsKg = distanceKm * 0.12; // media 120g/km
          result.value = {
            distance: distanceKm,
            emissions: emissionsKg
          };
        } catch (err) {
          error.value = 'Errore durante il calcolo delle emissioni.';
          console.error(err);
        }
      };

      return {
        startQuery,
        endQuery,
        startSuggestions,
        endSuggestions,
        loadingStart,
        loadingEnd,
        travelChoice,
        travelMode,
        carChoiceChoice,
        carSize,
        carSizeChoice,
        carType,
        handleStartSearch,
        handleEndSearch,
        calculateEmissions,
        result,
        error,
      };
    }
  });
</script>
