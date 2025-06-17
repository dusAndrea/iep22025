<template>
  <v-app :full-height="true">
    <GlobalSnackbar />
    <NavBar />

    <v-main :scrollable="true">
      <GaiaFeedCarousel />
      <v-container fluid>
        <v-row>
          <v-col cols="12"
            offset="0"
            md="10"
            offset-md="1"
            lg="8"
            offset-lg="2">
            <RouterView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <FooterBar />
  </v-app>
</template>
<script lang="ts">
  import { RouterView } from 'vue-router';
  import { NavBar, GlobalSnackbar, FooterBar } from '@/components/';
  import { defineComponent } from 'vue';
  import { GaiaFeedCarousel } from '@/components';

  export default defineComponent({
    name: 'App',
    components: {
      NavBar,
      RouterView,
      GlobalSnackbar,
      FooterBar,
      GaiaFeedCarousel
    },
  });
</script>
