<template>
  <v-app :full-height="true">
    <GlobalSnackbar />
    <Navbar />

    <v-main :scrollable="true">
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
    <Footer />
  </v-app>
</template>
<script lang="ts">
  import { RouterView } from 'vue-router';
  import { Navbar, GlobalSnackbar, Footer } from '@/components/';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    components: {
      Navbar,
      RouterView,
      GlobalSnackbar,
      Footer
    },
  });
</script>
