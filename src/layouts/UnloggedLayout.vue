<template>
  <v-app :full-height="true">
    <GlobalSnackbar />
    <v-main :scrollable="true">
      <v-container fluid
        class="login fill-height">
        <v-row class="fill-height"
          no-gutters>
          <v-col cols="6">
            <TagLineCard />
          </v-col>
          <v-col cols="4"
            align-self="center"
            class="text-text mx-auto">
            <RouterView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
  import { RouterView } from 'vue-router';
  import { defineComponent } from 'vue';
  import { TagLineCard, GlobalSnackbar } from '@/components';
  export default defineComponent({
    name: 'App',
    components: {
      RouterView,
      TagLineCard,
      GlobalSnackbar
    },
  });
</script>
