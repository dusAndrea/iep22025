<template>
  <v-app :full-height="true">
    <GlobalSnackbar />
    <Navbar />

    <v-main :scrollable="true">
      <v-container fluid>
        <v-row>
          <v-col cols="10"
            offset="1">
            <RouterView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
  import { RouterView } from 'vue-router';
  import { Navbar, GlobalSnackbar } from '@/components/';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    components: {
      Navbar,
      RouterView,
      GlobalSnackbar
    },
  });
</script>
