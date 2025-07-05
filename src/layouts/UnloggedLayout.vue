<template>
  <v-app :full-height="true">
    <LayoutSnackbar />
    <v-main :scrollable="true">
      <v-container fluid
        class="login fill-height">
        <v-row class="fill-height"
          no-gutters>
          <v-col md="6"
            class="d-none d-md-block">
            <TagLineCard />
          </v-col>
          <v-col cols="12"
            sm="8"
            md="4"
            align-self="center"
            class="text-text mx-auto">
            <RouterView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <FooterBar class="d-flex d-md-none" />
  </v-app>
</template>
<script lang="ts">
  import { RouterView } from 'vue-router';
  import { defineComponent } from 'vue';
  import { TagLineCard, LayoutSnackbar } from '@/components';
  import { LayoutFooter } from '@/components';
  export default defineComponent({
    name: 'App',
    components: {
      RouterView,
      TagLineCard,
      LayoutSnackbar,
      FooterBar: LayoutFooter
    },
  });
</script>
